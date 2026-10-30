import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listWebhooksExamplePayload } from "../examplePayloads";
import { basicConnection, jiraApi } from "../testHelpers";
import webhooks from "./webhooks";

const { selectWebhook } = webhooks;

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("selectWebhook (basic auth)", () => {
  test("labels each webhook with its events and keys it by id", async () => {
    const scope = jiraApi()
      .get("/rest/webhooks/1.0/webhook")
      .reply(200, [
        ...listWebhooksExamplePayload.data.values,
        {
          ...listWebhooksExamplePayload.data.values[0],
          id: 2,
          events: ["a", "b"],
        },
      ]);

    const { result } = await invokeDataSource(selectWebhook, {
      jiraConnection: basicConnection(),
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      { label: "jira:issue_created", key: "1" },
      { label: "a, b", key: "2" },
    ]);
  });

  test("returns an empty list when there are no webhooks", async () => {
    jiraApi().get("/rest/webhooks/1.0/webhook").reply(200, []);

    const { result } = await invokeDataSource(selectWebhook, {
      jiraConnection: basicConnection(),
    });

    expect(result).toEqual([]);
  });
});
