import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listAssignableUsersExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listAssignableUsers } from "./listAssignableUsers";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listAssignableUsers, {
    jiraConnection: basicConnection(),
    projectKey: "PROJ",
    pagination: { startAt: 0, maxResults: 50 },
  });

describe("listAssignableUsers", () => {
  test("lists assignable users for the project with the cleaned page values", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/user/assignable/search")
      .query({ project: "PROJ", startAt: "0", maxResults: "50" })
      .reply(200, listAssignableUsersExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listAssignableUsersExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/user/assignable/search")
      .query(true)
      .reply(400, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
