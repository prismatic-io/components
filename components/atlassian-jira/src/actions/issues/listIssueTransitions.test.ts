import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listIssueTransitionsExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { listIssueTransitions } from "./listIssueTransitions";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(listIssueTransitions, {
    jiraConnection: basicConnection(),
    issueId: "10201",
  });

describe("listIssueTransitions", () => {
  test("lists the transitions available for the issue", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issue/10201/transitions")
      .reply(200, listIssueTransitionsExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listIssueTransitionsExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issue/10201/transitions")
      .reply(404, {
        errorMessages: [
          "Issue does not exist or you do not have permission to see it.",
        ],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
