import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../connections";
import {
  DEFAULT_DATADOG_SITE,
  DEFAULT_WEBHOOK_ENCODE_AS,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../constants";
import { webhookExamplePayload } from "../examplePayloads";
import { webhook } from "./webhook";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const FLOW_NAME = "Alert Flow";
const OUR_URL = "https://hooks.example.com/trigger/our-flow";
const OTHER_URL = "https://hooks.example.com/trigger/someone-else";
const webhookPath = (name: string) =>
  `${WEBHOOKS_CONFIGURATION_PATH}/${encodeURIComponent(name)}`;
const STABLE_ID = "flow-stable-id";
const STATE_KEY = `datadogWebhook:${STABLE_ID}`;
const lifecycleContext = (
  crossFlowState: Record<string, unknown> = {},
  webhookUrls: Record<string, string> | null = { [FLOW_NAME]: OUR_URL },
) =>
  ({
    debug: { enabled: false },
    logger: loggerMock(),
    webhookUrls: webhookUrls ?? undefined,
    flow: { id: "flow-id", name: FLOW_NAME, stableId: STABLE_ID },
    crossFlowState,
  }) as never;
const lifecycleParams = (name = "prismatic-alerts") =>
  ({
    connection: testConnection,
    webhookName: name,
    webhookPayload: '{"title":"$EVENT_TITLE"}',
    webhookCustomHeaders: undefined,
  }) as never;
const lifecycle = () => {
  const handlers = webhook.webhookLifecycleHandlers;
  if (!handlers) throw new Error("webhookLifecycleHandlers is not defined");
  return handlers;
};
describe("webhook trigger", () => {
  test("returns the received payload unmodified", async () => {
    const alert = webhookExamplePayload.payload.body.data;
    const payload = {
      ...defaultTriggerPayload(),
      rawBody: {
        data: Buffer.from(JSON.stringify(alert)),
        contentType: "application/json",
      },
      body: { data: alert, contentType: "application/json" },
    };
    const { result } = await invokeTrigger(webhook, undefined, payload);
    expect(result).toBeDefined();
    expect(result?.payload).toStrictEqual(payload);
    expect(result?.payload.body.data).toEqual(alert);
  });
  test("exposes the alert example as its example payload", () => {
    expect(webhook.examplePayload).toBe(webhookExamplePayload);
  });
  test("uses webhookLifecycleHandlers instead of the legacy instance handlers", () => {
    expect(webhook.webhookLifecycleHandlers).toBeDefined();
    expect(webhook.onInstanceDeploy).toBeUndefined();
    expect(webhook.onInstanceDelete).toBeUndefined();
  });
});
describe("webhook trigger lifecycle", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  describe("create", () => {
    test("creates the webhook when no webhook has the name and remembers the name", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(404, { errors: ["Item Not Found"] })
        .post(WEBHOOKS_CONFIGURATION_PATH, {
          name: "prismatic-alerts",
          url: OUR_URL,
          encode_as: DEFAULT_WEBHOOK_ENCODE_AS,
          payload: '{"title":"$EVENT_TITLE"}',
        })
        .reply(201, {});
      const result = await lifecycle().create(
        lifecycleContext({ other: "kept" }),
        lifecycleParams(),
      );
      expect(scope.isDone()).toBe(true);
      expect(result).toEqual({
        crossFlowState: {
          other: "kept",
          [STATE_KEY]: { webhookName: "prismatic-alerts", webhookUrl: OUR_URL },
        },
      });
    });
    test("updates the webhook in place when it already points to this flow", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(200, { name: "prismatic-alerts", url: OUR_URL })
        .put(webhookPath("prismatic-alerts"), {
          url: OUR_URL,
          encode_as: DEFAULT_WEBHOOK_ENCODE_AS,
          payload: '{"title":"$EVENT_TITLE"}',
        })
        .reply(200, {});
      await lifecycle().create(lifecycleContext(), lifecycleParams());
      expect(scope.isDone()).toBe(true);
    });
    test("refuses to overwrite a webhook with the same name that points elsewhere", async () => {
      nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(200, { name: "prismatic-alerts", url: OTHER_URL });
      await expect(
        lifecycle().create(lifecycleContext(), lifecycleParams()),
      ).rejects.toThrow(/already exists and points to a different URL/);
    });
    test("removes the previously registered webhook when the name changed", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("old-name"))
        .reply(200, { name: "old-name", url: OUR_URL })
        .delete(webhookPath("old-name"))
        .reply(200, {})
        .get(webhookPath("new-name"))
        .reply(404, { errors: ["Item Not Found"] })
        .post(WEBHOOKS_CONFIGURATION_PATH)
        .reply(201, {});
      await lifecycle().create(
        lifecycleContext({
          [STATE_KEY]: { webhookName: "old-name", webhookUrl: OUR_URL },
        }),
        lifecycleParams("new-name"),
      );
      expect(scope.isDone()).toBe(true);
    });
    test("keeps a previously named webhook that no longer points to this flow", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("old-name"))
        .reply(200, { name: "old-name", url: OTHER_URL })
        .get(webhookPath("new-name"))
        .reply(404, { errors: ["Item Not Found"] })
        .post(WEBHOOKS_CONFIGURATION_PATH)
        .reply(201, {});
      await lifecycle().create(
        lifecycleContext({
          [STATE_KEY]: { webhookName: "old-name", webhookUrl: OUR_URL },
        }),
        lifecycleParams("new-name"),
      );
      expect(scope.isDone()).toBe(true);
    });
  });
  describe("delete", () => {
    test("deletes the webhook when it points to this flow", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(200, { name: "prismatic-alerts", url: OUR_URL })
        .delete(webhookPath("prismatic-alerts"))
        .reply(200, {});
      await lifecycle().delete(lifecycleContext(), lifecycleParams());
      expect(scope.isDone()).toBe(true);
    });
    test("leaves a webhook with the same name that points elsewhere", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(200, { name: "prismatic-alerts", url: OTHER_URL });
      await lifecycle().delete(lifecycleContext(), lifecycleParams());
      expect(scope.isDone()).toBe(true);
    });
    test("matches against the URL remembered at create when webhookUrls is absent", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(200, { name: "prismatic-alerts", url: OUR_URL })
        .delete(webhookPath("prismatic-alerts"))
        .reply(200, {});
      await lifecycle().delete(
        lifecycleContext(
          {
            [STATE_KEY]: {
              webhookName: "prismatic-alerts",
              webhookUrl: OUR_URL,
            },
          },
          null,
        ),
        lifecycleParams(),
      );
      expect(scope.isDone()).toBe(true);
    });
    test("calls Datadog not at all when no URL of this flow is known", async () => {
      await expect(
        lifecycle().delete(lifecycleContext({}, null), lifecycleParams()),
      ).resolves.toBeUndefined();
    });
    test("succeeds when the webhook no longer exists", async () => {
      const scope = nock(DEFAULT_DATADOG_SITE)
        .get(webhookPath("prismatic-alerts"))
        .reply(404, { errors: ["Item Not Found"] });
      await expect(
        lifecycle().delete(lifecycleContext(), lifecycleParams()),
      ).resolves.not.toThrow();
      expect(scope.isDone()).toBe(true);
    });
  });
});
