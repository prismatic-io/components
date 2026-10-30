import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { refreshWebhookExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { refreshWebhook } from "./refreshWebhook";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const refresh = () =>
  invoke(refreshWebhook, {
    jiraConnection: basicConnection(),
    webhookId: "10001",
  });

describe("refreshWebhook", () => {
  test("refreshes the webhook id through the v3 API, even under basic auth", async () => {
    const scope = jiraApi()
      .put(
        "/rest/api/3/webhook/refresh",
        (body) => JSON.stringify(body.webhookIds) === JSON.stringify(["10001"]),
      )
      .reply(200, refreshWebhookExamplePayload.data);

    const { result } = await refresh();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(refreshWebhookExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .put("/rest/api/3/webhook/refresh")
      .reply(403, { errorMessages: ["forbidden"] });

    await expect(refresh()).rejects.toMatchObject({
      response: { status: 403 },
    });
  });
});
