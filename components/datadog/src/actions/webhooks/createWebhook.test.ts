import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { webhookExample } from "../../examplePayloads";
import { createWebhook } from "./createWebhook";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const WEBHOOKS_PATH = "/api/v1/integration/webhooks/configuration/webhooks";
describe("createWebhook", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the inputs onto the snake_case request body", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .post(WEBHOOKS_PATH, {
        name: "my-integration-webhook",
        url: "https://hooks.example.com/datadog",
        custom_headers: '{"Authorization": "Bearer my-token"}',
        encode_as: "json",
        payload: '{"alert": "$ALERT_TITLE"}',
      })
      .reply(201, webhookExample.data);
    const { result } = await invoke(createWebhook, {
      connection: testConnection,
      webhookName: "my-integration-webhook",
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
      .post(WEBHOOKS_PATH)
      .reply(400, { errors: ["Webhook already exists"] });
    await expect(
      invoke(createWebhook, {
        connection: testConnection,
        webhookName: "my-integration-webhook",
        webhookUrl: "https://hooks.example.com/datadog",
        webhookCustomHeaders: undefined,
        webhookEncodeAs: undefined,
        webhookPayload: undefined,
      }),
    ).rejects.toThrow();
  });
});
