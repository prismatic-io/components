import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { updateIssueExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { updateIssue } from "./updateIssue";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(updateIssue, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    projectId: "10000",
    summary: "Login bug on mobile",
    description: "Users cannot log in.",
    ADFdescription: undefined,
    issueType: "",
    issueTypeId: "10001",
    assignee: "5b10ac8d82e05b22cc7d4ef5",
    reporter: undefined,
    priority: "3",
    labels: ["mobile"],
    additionalFields: {
      dueDate: "2026-11-30",
      versions: [{ id: "10002" }],
      fixVersions: [{ id: "10001" }],
    },
    dynamicValues: {},
    fieldValues: {},
  });

describe("updateIssue", () => {
  test("puts the issue fields built from the inputs", async () => {
    let sent: { fields: Record<string, unknown> } | undefined;
    const scope = jiraApi()
      .put("/rest/api/3/issue/10201", (body) => {
        sent = body;
        return true;
      })
      .reply(204, updateIssueExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({
      fields: {
        project: { id: "10000" },
        summary: "Login bug on mobile",
        description: {
          content: [
            {
              content: [{ text: "Users cannot log in.", type: "text" }],
              type: "paragraph",
            },
          ],
          type: "doc",
          version: 1,
        },
        assignee: { id: "5b10ac8d82e05b22cc7d4ef5" },
        fixVersions: [{ id: "10001" }],
        priority: { id: "3" },
        labels: ["mobile"],
        duedate: "2026-11-30",
        versions: [{ id: "10002" }],
      },
    });
    expect(result.data).toEqual(updateIssueExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .put("/rest/api/3/issue/10201")
      .reply(400, { errors: { summary: "Field 'summary' cannot be set." } });

    await expect(run()).rejects.toMatchObject({ response: { status: 400 } });
  });
});
