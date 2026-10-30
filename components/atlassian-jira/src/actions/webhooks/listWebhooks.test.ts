import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listWebhooks } from "./listWebhooks";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const list = () =>
  invoke(listWebhooks, { jiraConnection: basicConnection(), fetchAll: true });

describe("listWebhooks under basic auth", () => {
  test("reads the legacy webhook list once and returns the bare array, even with Fetch All on", async () => {
    const webhooks = listWebhooksExamplePayload.data.values;
    const scope = jiraApi()
      .get("/rest/webhooks/1.0/webhook")
      .once()
      .reply(200, webhooks);

    const { result } = await list();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(webhooks);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/webhooks/1.0/webhook")
      .reply(403, { errorMessages: ["forbidden"] });

    await expect(list()).rejects.toMatchObject({ response: { status: 403 } });
  });
});
