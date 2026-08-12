import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { webhookExample } from "../../examplePayloads";
import { getWebhook } from "./getWebhook";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const WEBHOOKS_PATH = "/api/v1/integration/webhooks/configuration/webhooks";
describe("getWebhook", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("URL-encodes the webhook name in the request path", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .get(`${WEBHOOKS_PATH}/my%20webhook%2Fprod`)
      .reply(200, webhookExample.data);
    const { result } = await invoke(getWebhook, {
      connection: testConnection,
      webhookName: "my webhook/prod",
    });
    expect(result.data).toEqual(webhookExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get(`${WEBHOOKS_PATH}/missing-webhook`)
      .reply(404, { errors: ["Webhook not found"] });
    await expect(
      invoke(getWebhook, {
        connection: testConnection,
        webhookName: "missing-webhook",
      }),
    ).rejects.toThrow();
  });
});
