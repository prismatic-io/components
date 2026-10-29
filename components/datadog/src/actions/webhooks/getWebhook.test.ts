import type { ActionContext } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import {
  DEFAULT_DATADOG_SITE,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../../constants";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhook } from "./getWebhook";

const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});

const CONSOLE_METHODS = ["log", "info", "debug", "warn", "error"] as const;

describe("getWebhook", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("URL-encodes the webhook name in the request path", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .get(`${WEBHOOKS_CONFIGURATION_PATH}/my%20webhook%2Fprod`)
      .reply(200, getWebhookExamplePayload.data);

    const { result } = await invoke(getWebhook, {
      connection: testConnection,
      webhookName: "my webhook/prod",
    });

    expect(result.data).toEqual(getWebhookExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });

  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get(`${WEBHOOKS_CONFIGURATION_PATH}/missing-webhook`)
      .reply(404, { errors: ["Webhook not found"] });

    await expect(
      invoke(getWebhook, {
        connection: testConnection,
        webhookName: "missing-webhook",
      }),
    ).rejects.toThrow();
  });

  test("never logs the API or application key when Debug Mode is on", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get(`${WEBHOOKS_CONFIGURATION_PATH}/my-webhook`)
      .reply(200, getWebhookExamplePayload.data);
    const spies = CONSOLE_METHODS.map((method) =>
      vi.spyOn(console, method).mockImplementation(() => undefined),
    );

    try {
      await invoke(
        getWebhook,
        { connection: testConnection, webhookName: "my-webhook" },
        { debug: { enabled: true } as ActionContext["debug"] },
      );
      const logged = spies
        .flatMap((spy) => spy.mock.calls.flat())
        .map((value) =>
          typeof value === "string" ? value : JSON.stringify(value),
        )
        .join("\n");
      expect(logged).not.toContain("test-api-key");
      expect(logged).not.toContain("test-application-key");
    } finally {
      for (const spy of spies) spy.mockRestore();
    }
  });
});
