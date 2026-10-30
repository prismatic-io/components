import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { deleteIssue } from "./deleteIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(deleteIssue, { jiraConnection: basicConnection(), issueId: "10201" });

describe("deleteIssue", () => {
  test("deletes the issue by ID", async () => {
    const scope = jiraApi()
      .delete("/rest/api/3/issue/10201")
      .reply(204, deleteIssueExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteIssueExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .delete("/rest/api/3/issue/10201")
      .reply(404, {
        errorMessages: [
          "Issue does not exist or you do not have permission to see it.",
        ],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
