import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listIssueTypesExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueTypes } from "./listIssueTypes";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () => invoke(listIssueTypes, { jiraConnection: basicConnection() });

describe("listIssueTypes", () => {
  test("lists the issue types", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issuetype")
      .reply(200, listIssueTypesExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueTypesExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issuetype")
      .reply(500, { errorMessages: ["request failed"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 500 } });
  });
});
