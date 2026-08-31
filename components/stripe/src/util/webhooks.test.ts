import { createStripeClient } from "../client";
import type { CreatedWebhook } from "../types";
import { onInstanceDelete, onInstanceDeploy } from "./webhooks";
jest.mock("../client");
const FLOW = "Stripe Events";
const FLOW_URL = "https://hooks.example.com/instance-abc/stripe-events";
const OTHER_FLOW_URL = "https://hooks.example.com/instance-xyz/other-flow";
interface FakeEndpoint {
  id: string;
  url: string;
  enabled_events: string[];
  secret: string;
}
const makeStripe = (initial: FakeEndpoint[] = []) => {
  const store: FakeEndpoint[] = initial.map((endpoint) => ({ ...endpoint }));
  let nextId = initial.length + 1;
  return {
    store,
    webhookEndpoints: {
      list: jest.fn(async () => ({
        object: "list",
        url: "/v1/webhook_endpoints",
        has_more: false,
        data: store.map((endpoint) => ({ ...endpoint })),
      })),
      create: jest.fn(
        async ({ url, enabled_events }: Record<string, never>) => {
          const created: FakeEndpoint = {
            id: `we_${nextId}`,
            url: url as unknown as string,
            enabled_events: [...(enabled_events as unknown as string[])],
            secret: `whsec_${nextId}`,
          };
          nextId += 1;
          store.push(created);
          return { ...created };
        },
      ),
      update: jest.fn(
        async (id: string, { enabled_events }: Record<string, never>) => {
          const found = store.find((endpoint) => endpoint.id === id);
          if (!found) throw new Error(`no such endpoint: ${id}`);
          found.enabled_events = [...(enabled_events as unknown as string[])];
          const { secret: _omitted, ...withoutSecret } = found;
          return { ...withoutSecret };
        },
      ),
      del: jest.fn(async (id: string) => {
        const index = store.findIndex((endpoint) => endpoint.id === id);
        if (index === -1) throw new Error(`no such endpoint: ${id}`);
        store.splice(index, 1);
        return { id, object: "webhook_endpoint", deleted: true };
      }),
    },
  };
};
const makeContext = () => ({
  flow: { name: FLOW },
  webhookUrls: { [FLOW]: FLOW_URL },
  crossFlowState: {} as Record<string, unknown>,
});
type Context = ReturnType<typeof makeContext>;
const deploy = (context: Context, webhookEvents: string[]) =>
  onInstanceDeploy(context as never, { connection: {}, webhookEvents });
const teardown = (context: Context, webhookEvents: string[]) => {
  const inputs = { connection: {}, webhookEvents };
  return onInstanceDelete(context as never, inputs);
};
const storedWebhook = (context: Context) =>
  (context.crossFlowState[FLOW] as CreatedWebhook | undefined)?.webhook;
const useStripe = (stripe: ReturnType<typeof makeStripe>) => {
  (createStripeClient as jest.Mock).mockReturnValue(stripe);
};
beforeEach(() => {
  jest.clearAllMocks();
});
describe("onInstanceDeploy", () => {
  it("does not create a second endpoint when the event set changes", async () => {
    const stripe = makeStripe();
    useStripe(stripe);
    const context = makeContext();
    await deploy(context, ["charge.succeeded"]);
    await deploy(context, ["charge.succeeded", "charge.failed"]);
    expect(stripe.store).toHaveLength(1);
    expect(stripe.store[0].enabled_events).toEqual([
      "charge.succeeded",
      "charge.failed",
    ]);
  });
  it("creates one endpoint on first deploy and stores its signing secret", async () => {
    const stripe = makeStripe();
    useStripe(stripe);
    const context = makeContext();
    await deploy(context, ["charge.succeeded"]);
    expect(stripe.store).toHaveLength(1);
    expect(storedWebhook(context)?.secret).toBe("whsec_1");
  });
  it("leaves the endpoint alone when redeployed with an unchanged event set", async () => {
    const stripe = makeStripe();
    useStripe(stripe);
    const context = makeContext();
    await deploy(context, ["charge.succeeded"]);
    stripe.webhookEndpoints.create.mockClear();
    await deploy(context, ["charge.succeeded"]);
    expect(stripe.webhookEndpoints.create).not.toHaveBeenCalled();
    expect(stripe.webhookEndpoints.update).not.toHaveBeenCalled();
  });
  it("adopts a pre-existing endpoint without inventing a signing secret", async () => {
    const stripe = makeStripe([
      {
        id: "we_1",
        url: FLOW_URL,
        enabled_events: ["charge.succeeded"],
        secret: "whsec_external",
      },
    ]);
    useStripe(stripe);
    const context = makeContext();
    await deploy(context, ["charge.succeeded", "charge.failed"]);
    expect(stripe.store).toHaveLength(1);
    expect(stripe.store[0].enabled_events).toEqual([
      "charge.succeeded",
      "charge.failed",
    ]);
    expect(storedWebhook(context)?.secret).toBeUndefined();
  });
  it("keeps the signing secret when the event set changes", async () => {
    const stripe = makeStripe();
    useStripe(stripe);
    const context = makeContext();
    await deploy(context, ["charge.succeeded"]);
    const originalSecret = storedWebhook(context)?.secret;
    await deploy(context, ["charge.succeeded", "charge.failed"]);
    expect(originalSecret).toBe("whsec_1");
    expect(storedWebhook(context)?.secret).toBe(originalSecret);
  });
});
describe("onInstanceDelete", () => {
  it("removes the flow's endpoint even when the event set has changed since deploy", async () => {
    const stripe = makeStripe([
      {
        id: "we_1",
        url: FLOW_URL,
        enabled_events: ["charge.succeeded"],
        secret: "whsec_1",
      },
    ]);
    useStripe(stripe);
    await teardown(makeContext(), ["charge.succeeded", "charge.failed"]);
    expect(stripe.store).toHaveLength(0);
  });
  it("leaves endpoints belonging to other flows untouched", async () => {
    const stripe = makeStripe([
      {
        id: "we_1",
        url: FLOW_URL,
        enabled_events: ["charge.succeeded"],
        secret: "whsec_1",
      },
      {
        id: "we_2",
        url: OTHER_FLOW_URL,
        enabled_events: ["charge.succeeded"],
        secret: "whsec_2",
      },
    ]);
    useStripe(stripe);
    await teardown(makeContext(), ["charge.succeeded"]);
    expect(stripe.store.map(({ id }) => id)).toEqual(["we_2"]);
  });
});
