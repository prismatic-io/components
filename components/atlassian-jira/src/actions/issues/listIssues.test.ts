import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { listIssuesExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssues } from "./listIssues";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = (nextPageToken?: string) =>
  invoke(listIssues, {
    jiraConnection: basicConnection(),
    projectId: "10000",
    pagination: { nextPageToken, maxResults: 25 },
    fields: "",
  });

describe("listIssues", () => {
  test("searches the project with the default fields and forwards the page token", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/search/jql")
      .query({
        jql: "project=10000",
        maxResults: "25",
        fields: DEFAULT_ISSUE_FIELDS,
        nextPageToken: "token-2",
      })
      .reply(200, listIssuesExamplePayload.data);

    const { result } = await run("token-2");

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssuesExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/search/jql")
      .query(true)
      .reply(400, {
        errorMessages: [
          "The value '10000' does not exist for the field 'project'.",
        ],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
