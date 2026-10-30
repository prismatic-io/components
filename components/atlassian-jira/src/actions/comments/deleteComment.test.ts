import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { deleteComment } from "./deleteComment";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(deleteComment, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    commentId: "10050",
  });

describe("deleteComment", () => {
  test("deletes the comment from the issue", async () => {
    const scope = jiraApi()
      .delete("/rest/api/3/issue/10201/comment/10050")
      .reply(200, deleteCommentExamplePayload.data);

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteCommentExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .delete("/rest/api/3/issue/10201/comment/10050")
      .reply(404, { errorMessages: ["Comment does not exist"] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
