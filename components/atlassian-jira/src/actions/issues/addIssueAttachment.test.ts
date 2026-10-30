import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { addIssueAttachmentExamplePayload } from "../../examplePayloads";
import { basicConnection, jiraApi } from "../../testHelpers";
import { addIssueAttachment } from "./addIssueAttachment";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const upload = (fileName: string) =>
  invoke(addIssueAttachment, {
    jiraConnection: basicConnection(),
    issueId: "PROJ-123",
    file: { data: Buffer.from("hello"), contentType: "text/plain" },
    fileName,
  });

describe("addIssueAttachment", () => {
  test("sends the file as multipart form data under the given file name", async () => {
    const scope = jiraApi()
      .post("/rest/api/3/issue/PROJ-123/attachments", (body: string) =>
        body.includes('name="file"; filename="report.txt"'),
      )
      .matchHeader("X-Atlassian-Token", "no-check")
      .matchHeader("content-type", /^multipart\/form-data; boundary=/)
      .reply(200, addIssueAttachmentExamplePayload.data);

    const { result } = await upload("report.txt");

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(addIssueAttachmentExamplePayload.data);
  });

  test("rejects when Jira answers with an error", async () => {
    jiraApi()
      .post("/rest/api/3/issue/PROJ-123/attachments")
      .reply(413, { errorMessages: ["too big"] });

    await expect(upload("report.txt")).rejects.toMatchObject({
      response: { status: 413 },
    });
  });
});
