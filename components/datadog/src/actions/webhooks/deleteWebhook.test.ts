import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import {
  DEFAULT_DATADOG_SITE,
  WEBHOOKS_CONFIGURATION_PATH,
} from "../../constants";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhook } from "./deleteWebhook";

const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});

describe("deleteWebhook", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("discards the response body and returns a null data payload", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .delete(`${WEBHOOKS_CONFIGURATION_PATH}/my%20webhook%2Fprod`)
      .reply(200, { name: "my webhook/prod", deleted: true });

    const { result } = await invoke(deleteWebhook, {
      connection: testConnection,
      webhookName: "my webhook/prod",
    });

    expect(result).toEqual(deleteWebhookExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .delete(`${WEBHOOKS_CONFIGURATION_PATH}/missing-webhook`)
      .reply(404, { errors: ["Webhook not found"] });

    await expect(
      invoke(deleteWebhook, {
        connection: testConnection,
        webhookName: "missing-webhook",
      }),
    ).rejects.toThrow();
  });
});
