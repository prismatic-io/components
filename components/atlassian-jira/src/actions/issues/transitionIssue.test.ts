import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { transitionIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { transitionIssue } from "./transitionIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(transitionIssue, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    transitionId: "21",
  });

describe("transitionIssue", () => {
  test("posts the transition ID", async () => {
    const scope = jiraApi()
      .post("/rest/api/3/issue/10201/transitions", { transition: { id: "21" } })
      .reply(204, transitionIssueExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(transitionIssueExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/issue/10201/transitions")
      .reply(400, {
        errorMessages: ["Transition id '21' is not valid for this issue."],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
