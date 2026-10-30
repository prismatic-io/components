import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listIssueWorklogsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueWorklogs } from "./listIssueWorklogs";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listIssueWorklogs, {
    jiraConnection: basicConnection(),
    issueId: "10201",
  });

describe("listIssueWorklogs", () => {
  test("lists the issue's worklogs", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issue/10201/worklog")
      .reply(200, listIssueWorklogsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueWorklogsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issue/10201/worklog")
      .reply(404, {
        errorMessages: [
          "Issue does not exist or you do not have permission to see it.",
        ],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
