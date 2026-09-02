import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { changePostStatusExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { changePostStatus } from "./changePostStatus";
const PATH = `${V1}/posts/change_status`;
const params = {
  connection: testConnection,
  postId: "553c3ef8b8cdcd1501ba1238",
  statusRequired: "planned",
  changerId: "553c3ef8b8cdcd1501ba9999",
  shouldNotifyVoters: true,
  postCommentValue: "We have moved this to our roadmap.",
  additionalFields: {},
};
describe("changePostStatus", () => {
  afterEach(() => nock.cleanAll());
  test("changes a post status and forwards the comment", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, changePostStatusExamplePayload.data);
    const { result } = await invoke(changePostStatus, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      postID: "553c3ef8b8cdcd1501ba1238",
      status: "planned",
      changerID: "553c3ef8b8cdcd1501ba9999",
      shouldNotifyVoters: true,
      commentValue: "We have moved this to our roadmap.",
    });
    expect(result.data).toStrictEqual(changePostStatusExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid status" });
    await expect(invoke(changePostStatus, params)).rejects.toThrow();
  });
});
