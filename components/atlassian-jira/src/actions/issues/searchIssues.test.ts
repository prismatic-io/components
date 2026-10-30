import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { searchIssuesExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { DEFAULT_ISSUE_FIELDS } from "../../constants";
import { searchIssues } from "./searchIssues";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const search = (params: { searchString: string; projectKey?: string }) =>
  invoke(searchIssues, {
    jiraConnection: basicConnection(),
    searchString: params.searchString,
    projectKey: params.projectKey ?? "",
    fields: "",
  });

const expectJql = (jql: string) =>
  jiraApi()
    .get("/rest/api/3/search/jql")
    .query(
      (query) => query.jql === jql && query.fields === DEFAULT_ISSUE_FIELDS,
    );

describe("searchIssues", () => {
  test("escapes quote marks in the search text and joins the project filter with AND", async () => {
    const scope = expectJql(
      'summary ~ "say \\"hi\\"" AND project = "PROJ"',
    ).reply(200, searchIssuesExamplePayload.data);

    const { result } = await search({
      searchString: 'say "hi"',
      projectKey: "PROJ",
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(searchIssuesExamplePayload.data);
  });

  test("omits the project clause when no project key is given", async () => {
    const scope = expectJql('summary ~ "login bug"').reply(
      200,
      searchIssuesExamplePayload.data,
    );

    await search({ searchString: "login bug" });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/search/jql")
      .query(true)
      .reply(500, { errorMessages: ["boom"] });

    await expect(search({ searchString: "login bug" })).rejects.toMatchObject({
      response: { status: 500 },
    });
  });
});
