import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  downloadAttachmentExamplePayload,
  getIssueExamplePayload,
} from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { downloadAttachment } from "./downloadAttachment";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const run = () =>
  invoke(downloadAttachment, {
    jiraConnection: basicConnection(),
    issueId: "10201",
    attachmentIds: undefined,
  });

const [{ id: attachmentId }] = getIssueExamplePayload.data.fields.attachment;
const [expected] = downloadAttachmentExamplePayload.data;

describe("downloadAttachment", () => {
  test("reads the issue, then downloads each attachment's content", async () => {
    const scope = jiraApi()
      .get("/rest/api/3/issue/10201")
      .reply(200, getIssueExamplePayload.data)
      .get(`/rest/api/3/attachment/content/${attachmentId}`)
      .reply(200, expected.data, { "Content-Type": expected.contentType });

    const { result } = await run();

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(downloadAttachmentExamplePayload.data);
  });

  test("rejects when the attachment download fails", async () => {
    jiraApi()
      .get("/rest/api/3/issue/10201")
      .reply(200, getIssueExamplePayload.data)
      .get(`/rest/api/3/attachment/content/${attachmentId}`)
      .reply(404, { errorMessages: ["The attachment does not exist."] });

    await expect(run()).rejects.toMatchObject({ response: { status: 404 } });
  });
});
