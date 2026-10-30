import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { addCommentExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { addComment } from "./addComment";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(addComment, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    comment: "Looks good.",
    dynamicValues: {},
    fieldValues: { visibility: "internal" },
  });

describe("addComment", () => {
  test("posts the comment as an ADF document with the extra values merged into body", async () => {
    let sent: Record<string, unknown> | undefined;
    const scope = jiraApi()
      .post("/rest/api/3/issue/10201/comment", (body) => {
        sent = body;
        return true;
      })
      .reply(201, addCommentExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({
      body: {
        content: [
          {
            content: [{ text: "Looks good.", type: "text" }],
            type: "paragraph",
          },
        ],
        type: "doc",
        version: 1,
        visibility: "internal",
      },
    });
    expect(result.data).toEqual(addCommentExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/issue/10201/comment")
      .reply(404, { errorMessages: ["Issue does not exist"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
