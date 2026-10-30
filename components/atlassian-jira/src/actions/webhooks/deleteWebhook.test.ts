import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { deleteWebhook } from "./deleteWebhook";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const remove = () =>
  invoke(deleteWebhook, {
    jiraConnection: basicConnection(),
    webhookId: "10001",
  });

describe("deleteWebhook under basic auth", () => {
  test("deletes the legacy webhook addressed by its id in the path", async () => {
    const scope = jiraApi()
      .delete("/rest/webhooks/1.0/webhook/10001")
      .reply(200, JSON.stringify(deleteWebhookExamplePayload.data), {
        "Content-Type": "application/json",
      });

    const { result } = await remove();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteWebhookExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .delete("/rest/webhooks/1.0/webhook/10001")
      .reply(404, { errorMessages: ["not found"] });

    await expect(remove()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
