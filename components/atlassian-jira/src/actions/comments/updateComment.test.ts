import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { updateCommentExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { updateComment } from "./updateComment";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(updateComment, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    commentId: "10050",
    comment: "Updated text.",
    dynamicValues: {},
    fieldValues: {},
  });

describe("updateComment", () => {
  test("puts the new comment text as an ADF document", async () => {
    let sent: Record<string, unknown> | undefined;
    const scope = jiraApi()
      .put("/rest/api/3/issue/10201/comment/10050", (body) => {
        sent = body;
        return true;
      })
      .reply(200, updateCommentExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({
      body: {
        content: [
          {
            content: [{ text: "Updated text.", type: "text" }],
            type: "paragraph",
          },
        ],
        type: "doc",
        version: 1,
      },
    });
    expect(result.data).toEqual(updateCommentExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .put("/rest/api/3/issue/10201/comment/10050")
      .reply(403, {
        errorMessages: ["You do not have permission to edit this comment"],
      });

    await expect(run()).rejects.toMatchObject({ response: { status: 403 } });
  });
});
