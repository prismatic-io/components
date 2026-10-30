import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { searchUsersExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { searchUsers } from "./searchUsers";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(searchUsers, {
    jiraConnection: basicConnection(),
    searchString: "Jane",
  });

describe("searchUsers", () => {
  test("searches users by the text", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/user/search")
      .query({ query: "Jane" })
      .reply(200, searchUsersExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(searchUsersExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/user/search")
      .query(true)
      .reply(500, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 500 } });
  });
});
