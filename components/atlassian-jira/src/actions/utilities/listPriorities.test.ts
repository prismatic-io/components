import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listPrioritiesExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listPriorities } from "./listPriorities";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listPriorities, {
    jiraConnection: basicConnection(),
    pagination: { startAt: 50, maxResults: 25 },
  });

describe("listPriorities", () => {
  test("forwards the pagination", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/priority/search")
      .query({ startAt: "50", maxResults: "25" })
      .reply(200, listPrioritiesExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listPrioritiesExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/priority/search")
      .query(true)
      .reply(500, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 500 } });
  });
});
