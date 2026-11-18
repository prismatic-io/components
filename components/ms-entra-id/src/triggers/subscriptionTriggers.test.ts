import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { createClient } from "../client";
import { TriggerBranches } from "../constants";
import {
  groupTriggerExamplePayload,
  userTriggerExamplePayload,
} from "../examplePayloads";
import { groupTrigger } from "./groupTrigger";
import { userTrigger } from "./userTrigger";

vi.mock("../client", () => ({ createClient: vi.fn() }));

const FLOW_KEY = "SW5zdGFuY2VGbG93";
const WEBHOOK_URL = `https://hooks.example.com/trigger/${FLOW_KEY}`;
const EXPIRATION = "2026-12-01T00:00:00.0000000Z";

const subscription = (id: string, resource: string, changeType: string) => ({
  id,
  resource,
  changeType,
  notificationUrl: WEBHOOK_URL,
  expirationDateTime: EXPIRATION,
});

const createMockClient = (listed: ReturnType<typeof subscription>[]) => ({
  get: vi.fn().mockResolvedValue({ data: { value: listed } }),
  post: vi
    .fn()
    .mockImplementation(
      (_url: string, body: { resource: string; changeType: string }) =>
        Promise.resolve({
          data: subscription("new-sub", body.resource, body.changeType),
        }),
    ),
  patch: vi.fn(),
  delete: vi.fn().mockResolvedValue({ data: undefined }),
});

const createContext = (crossFlowState: Record<string, unknown> = {}) => ({
  crossFlowState,
  debug: { enabled: false },
  flow: { id: "flow-id", name: "Flow" },
  logger: { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() },
  webhookUrls: { Flow: WEBHOOK_URL },
});

const connection = { key: "msEntraIdOAuth", token: { access_token: "token" } };

describe.each([
  { trigger: userTrigger, resource: "users" },
  { trigger: groupTrigger, resource: "groups" },
])("$resource subscription trigger", ({ trigger, resource }) => {
  const handlers = trigger.webhookLifecycleHandlers as NonNullable<
    typeof trigger.webhookLifecycleHandlers
  >;

  it("replaces the previous subscription with one built from the changed Change Type", async () => {
    const client = createMockClient([
      subscription("old-sub", resource, "updated"),
    ]);
    vi.mocked(createClient).mockReturnValue(client as never);

    const result = await handlers.create(
      createContext({ [FLOW_KEY]: "old-sub" }) as never,
      {
        connection,
        changeType: "deleted",
        expirationTriggerDateTime: EXPIRATION,
      } as never,
    );

    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({
        resource,
        changeType: "deleted",
        notificationUrl: WEBHOOK_URL,
        expirationDateTime: EXPIRATION,
      }),
    );
    expect(client.patch).not.toHaveBeenCalled();
    expect(client.delete).toHaveBeenCalledTimes(1);
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/old-sub");
    expect(result).toEqual({
      crossFlowState: { [FLOW_KEY]: "new-sub", [`${FLOW_KEY}:undeleted`]: "" },
    });
  });

  it("deletes the stored subscription by ID when the current token cannot list it", async () => {
    const client = createMockClient([]);
    vi.mocked(createClient).mockReturnValue(client as never);

    await handlers.create(
      createContext({ [FLOW_KEY]: "app-only-sub" }) as never,
      { connection, changeType: "updated" } as never,
    );

    expect(client.post).toHaveBeenCalledWith(
      "/subscriptions",
      expect.objectContaining({
        resource,
        changeType: "updated",
        expirationDateTime: expect.any(String),
      }),
    );
    expect(client.delete).toHaveBeenCalledWith("/subscriptions/app-only-sub");
  });

  it("deletes the stored subscription on instance deletion when the current token cannot list it", async () => {
    const client = createMockClient([]);
    vi.mocked(createClient).mockReturnValue(client as never);

    await handlers.delete(
      createContext({ [FLOW_KEY]: "app-only-sub" }) as never,
      { connection } as never,
    );

    expect(client.delete).toHaveBeenCalledWith("/subscriptions/app-only-sub");
  });
});

describe.each([
  { trigger: userTrigger, examplePayload: userTriggerExamplePayload },
  { trigger: groupTrigger, examplePayload: groupTriggerExamplePayload },
])("$trigger.display.label perform", ({ trigger, examplePayload }) => {
  it("passes a change notification through on the Notification branch", async () => {
    const { payload } = examplePayload;
    const { result } = await invokeTrigger(trigger, {}, payload);
    expect(result).toEqual({ payload, branch: TriggerBranches.Notification });
  });

  it("echoes the validation token as text/plain on the URL Validation branch", async () => {
    const payload = {
      ...examplePayload.payload,
      queryParameters: { validationToken: "token-123" },
    };
    const { result } = await invokeTrigger(trigger, {}, payload);
    expect(result).toEqual({
      payload,
      response: {
        statusCode: 200,
        contentType: "text/plain",
        body: "token-123",
      },
      branch: TriggerBranches.URLValidation,
    });
  });
});
