import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { delegatedConnection, GRAPH_HOST } from "../../testHelpers";
import { getMessageById } from "./getMessageById";

const MESSAGE_ID = "AAMkAGUAAAwTW09AAA=";

const MIME_WITH_ATTACHMENT = [
  "From: sender@example.com",
  "To: recipient@example.com",
  "Subject: Quarterly report",
  "MIME-Version: 1.0",
  'Content-Type: multipart/mixed; boundary="b1"',
  "",
  "--b1",
  "Content-Type: text/plain",
  "",
  "Report attached.",
  "--b1",
  'Content-Type: application/pdf; name="quarterly-report.pdf"',
  'Content-Disposition: attachment; filename="quarterly-report.pdf"',
  "Content-Transfer-Encoding: base64",
  "",
  Buffer.from("example file content").toString("base64"),
  "--b1--",
  "",
].join("\r\n");

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("getMessageById", () => {
  test("returns each attachment's file name, size and content alongside the parsed message", async () => {
    nock(GRAPH_HOST).get(`/v1.0/me/messages/${MESSAGE_ID}/$value`).reply(200, MIME_WITH_ATTACHMENT);

    const { result } = await invoke(getMessageById, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    const [attachment] = result?.data.message.attachments ?? [];
    expect(attachment).toMatchObject({
      filename: "quarterly-report.pdf",
      contentType: "application/pdf",
      size: 20,
      contentId: undefined,
      related: undefined,
    });
    expect(String(attachment.data)).toBe("example file content");
    expect(result?.data.message.text?.trim()).toBe("Report attached.");
    expect(result?.data.rawMessage).toBe(MIME_WITH_ATTACHMENT);
  });

  test("propagates an error from Graph", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/$value`)
      .reply(404, { error: { code: "ErrorItemNotFound" } });

    await expect(
      invoke(getMessageById, { connection: delegatedConnection(), messageId: MESSAGE_ID }),
    ).rejects.toThrow();
  });
});
