import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { getIssue } from "./getIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(getIssue, { jiraConnection: basicConnection(), issueId: "10201" });

describe("getIssue", () => {
  test("fetches the issue by ID", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issue/10201")
      .reply(200, getIssueExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getIssueExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .get("/rest/api/3/issue/10201")
      .reply(404, {
        errorMessages: [
          "Issue does not exist or you do not have permission to see it.",
        ],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
