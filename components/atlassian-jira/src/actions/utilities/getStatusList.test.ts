import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getStatusListExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getStatusList } from "./getStatusList";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getStatusList, {
    jiraConnection: basicConnection(),
    projectId: "10000",
    pagination: { startAt: 0, maxResults: 50 },
  });

describe("getStatusList", () => {
  test("lists statuses for the project with the cleaned page values", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/statuses/search")
      .query({ projectId: "10000", startAt: "0", maxResults: "50" })
      .reply(200, getStatusListExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getStatusListExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/statuses/search")
      .query(true)
      .reply(403, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 403 } });
  });
});
