import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { webhookExample } from "../../examplePayloads";
import { updateWebhook } from "./updateWebhook";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const WEBHOOKS_PATH = "/api/v1/integration/webhooks/configuration/webhooks";
describe("updateWebhook", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("sends the name only in the path, never in the body", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .put(`${WEBHOOKS_PATH}/my%20webhook%2Fprod`, {
        url: "https://hooks.example.com/datadog",
        custom_headers: '{"Authorization": "Bearer my-token"}',
        encode_as: "json",
        payload: '{"alert": "$ALERT_TITLE"}',
      })
      .reply(200, webhookExample.data);
    const { result } = await invoke(updateWebhook, {
      connection: testConnection,
      webhookName: "my webhook/prod",
      webhookUrl: "https://hooks.example.com/datadog",
      webhookCustomHeaders: '{"Authorization": "Bearer my-token"}',
      webhookEncodeAs: "json",
      webhookPayload: '{"alert": "$ALERT_TITLE"}',
    });
    expect(result.data).toEqual(webhookExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .put(`${WEBHOOKS_PATH}/missing-webhook`)
      .reply(404, { errors: ["Webhook not found"] });
    await expect(
      invoke(updateWebhook, {
        connection: testConnection,
        webhookName: "missing-webhook",
        webhookUrl: "https://hooks.example.com/datadog",
        webhookCustomHeaders: undefined,
        webhookEncodeAs: undefined,
        webhookPayload: undefined,
      }),
    ).rejects.toThrow();
  });
});
