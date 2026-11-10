import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { ATTACHMENT_METADATA_SELECT, ITEM_ATTACHMENT_EXPAND } from "../../constants";
import {
  downloadEventAttachmentExamplePayload,
  downloadMessageAttachmentExamplePayload,
  listEventAttachmentsExamplePayload,
  listMessageAttachmentsExamplePayload,
} from "../../examplePayloads";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../../testHelpers";
import { downloadEventAttachment } from "./downloadEventAttachment";
import { downloadMessageAttachment } from "./downloadMessageAttachment";
import { listEventAttachments } from "./listEventAttachments";
import { listMessageAttachments } from "./listMessageAttachments";

const MESSAGE_ID = "AAMkAGUAAAwTW09AAA=";
const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";
const ATTACHMENT_ID = "AAMkADI5MAAIT3drCAAABEgAQANAqbAe7qaROhYdTnUQwXm0=";
const METADATA_QUERY = { $select: ATTACHMENT_METADATA_SELECT };
const DOWNLOAD_METADATA_QUERY = { ...METADATA_QUERY, $expand: ITEM_ATTACHMENT_EXPAND };

const fileMetadata = (contentType: string | null) => ({
  "@odata.type": "#microsoft.graph.fileAttachment",
  id: ATTACHMENT_ID,
  name: "quarterly-report.pdf",
  contentType,
  size: 20,
  isInline: false,
});

const itemMetadata = (itemType: string) => ({
  "@odata.type": "#microsoft.graph.itemAttachment",
  id: ATTACHMENT_ID,
  name: "Attached item",
  contentType: null,
  size: 1306,
  isInline: false,
  item: { "@odata.type": itemType, id: "AAMkAGItem=" },
});

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("listMessageAttachments", () => {
  test("lists the message's attachments with contentBytes left out", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, listMessageAttachmentsExamplePayload.data);

    const { result } = await invoke(listMessageAttachments, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    expect(result).toEqual(listMessageAttachmentsExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("follows @odata.nextLink until every page is read", async () => {
    const [first, second] = listMessageAttachmentsExamplePayload.data.value;
    nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, {
        "@odata.context": listMessageAttachmentsExamplePayload.data["@odata.context"],
        value: [first],
        "@odata.nextLink": `${GRAPH_HOST}/v1.0/me/messages/${MESSAGE_ID}/attachments?$skiptoken=page2`,
      })
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query({ $skiptoken: "page2" })
      .reply(200, { value: [second] });

    const { result } = await invoke(listMessageAttachments, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    expect(result?.data.value).toEqual([first, second]);
  });

  test("rewrites /me to /users/{userId} for a client-credentials connection", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/users/${CLIENT_CREDENTIALS_USER_ID}/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, listMessageAttachmentsExamplePayload.data);

    await invoke(listMessageAttachments, {
      connection: clientCredentialsConnection(),
      messageId: MESSAGE_ID,
    });

    expect(scope.isDone()).toBe(true);
  });

  test("propagates an error from Graph", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(404, { error: { code: "ErrorItemNotFound" } });

    await expect(
      invoke(listMessageAttachments, { connection: delegatedConnection(), messageId: MESSAGE_ID }),
    ).rejects.toThrow();
  });
});

describe("listEventAttachments", () => {
  test("lists the event's attachments with contentBytes left out", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, listEventAttachmentsExamplePayload.data);

    const { result } = await invoke(listEventAttachments, {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
    });

    expect(result).toEqual(listEventAttachmentsExamplePayload);
  });

  test("propagates an error from Graph", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(403, { error: { code: "ErrorAccessDenied" } });

    await expect(
      invoke(listEventAttachments, { connection: delegatedConnection(), eventId: EVENT_ID }),
    ).rejects.toThrow();
  });
});

describe("downloadMessageAttachment", () => {
  const attachmentPath = `/v1.0/me/messages/${MESSAGE_ID}/attachments/${ATTACHMENT_ID}`;

  test("returns the raw bytes unchanged with the attachment's content type", async () => {
    const bytes = Buffer.from([0x25, 0x50, 0x44, 0x46, 0xff, 0xfe, 0x00, 0x80]);
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, fileMetadata("application/pdf"))
      .get(`${attachmentPath}/$value`)
      .reply(200, bytes, { "Content-Type": "application/pdf" });

    const { result } = await invoke(downloadMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(Buffer.isBuffer(result?.data)).toBe(true);
    expect(result?.data.equals(bytes)).toBe(true);
    expect(result?.contentType).toBe("application/pdf");
  });

  test("returns the example payload's shape", async () => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, fileMetadata(downloadMessageAttachmentExamplePayload.contentType))
      .get(`${attachmentPath}/$value`)
      .reply(200, downloadMessageAttachmentExamplePayload.data);

    const { result } = await invoke(downloadMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(result).toEqual(downloadMessageAttachmentExamplePayload);
  });

  test("falls back to the response content type when the metadata has none", async () => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, fileMetadata(null))
      .get(`${attachmentPath}/$value`)
      .reply(200, "BEGIN:VCALENDAR", { "Content-Type": "text/calendar" });

    const { result } = await invoke(downloadMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(result?.contentType).toBe("text/calendar");
  });

  test.each([
    ["#microsoft.graph.message", "Subject: Inner message\r\n", "message/rfc822"],
    ["#microsoft.graph.event", "BEGIN:VCALENDAR\r\n", "text/calendar"],
    ["#microsoft.graph.contact", "BEGIN:VCARD\r\n", "text/plain"],
  ])("reports an item attachment of type %s as %s", async (itemType, body, expected) => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, itemMetadata(itemType))
      .get(`${attachmentPath}/$value`)
      .reply(200, body, { "Content-Type": "text/plain" });

    const { result } = await invoke(downloadMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(result?.contentType).toBe(expected);
    expect(result?.data.toString()).toBe(body);
  });

  test("fails clearly on a reference attachment without requesting its contents", async () => {
    const scope = nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, {
        ...fileMetadata(null),
        "@odata.type": "#microsoft.graph.referenceAttachment",
        name: "Budget.xlsx",
      });

    await expect(
      invoke(downloadMessageAttachment, {
        connection: delegatedConnection(),
        messageId: MESSAGE_ID,
        attachmentId: ATTACHMENT_ID,
      }),
    ).rejects.toThrow('Attachment "Budget.xlsx" is a link to a file stored in the cloud');
    expect(scope.isDone()).toBe(true);
  });

  test("rewrites both requests to /users/{userId} for a client-credentials connection", async () => {
    const userPath = `/v1.0/users/${CLIENT_CREDENTIALS_USER_ID}/messages/${MESSAGE_ID}/attachments/${ATTACHMENT_ID}`;
    const scope = nock(GRAPH_HOST)
      .get(userPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, fileMetadata("application/pdf"))
      .get(`${userPath}/$value`)
      .reply(200, downloadMessageAttachmentExamplePayload.data);

    await invoke(downloadMessageAttachment, {
      connection: clientCredentialsConnection(),
      messageId: MESSAGE_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(scope.isDone()).toBe(true);
  });

  test("propagates an error from Graph", async () => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(404, { error: { code: "ErrorItemNotFound" } });

    await expect(
      invoke(downloadMessageAttachment, {
        connection: delegatedConnection(),
        messageId: MESSAGE_ID,
        attachmentId: ATTACHMENT_ID,
      }),
    ).rejects.toThrow();
  });
});

describe("downloadEventAttachment", () => {
  const attachmentPath = `/v1.0/me/events/${EVENT_ID}/attachments/${ATTACHMENT_ID}`;

  test("downloads the event attachment's raw bytes", async () => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(200, fileMetadata(downloadEventAttachmentExamplePayload.contentType))
      .get(`${attachmentPath}/$value`)
      .reply(200, downloadEventAttachmentExamplePayload.data);

    const { result } = await invoke(downloadEventAttachment, {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
      attachmentId: ATTACHMENT_ID,
    });

    expect(result).toEqual(downloadEventAttachmentExamplePayload);
  });

  test("propagates an error from Graph", async () => {
    nock(GRAPH_HOST)
      .get(attachmentPath)
      .query(DOWNLOAD_METADATA_QUERY)
      .reply(404, { error: { code: "ErrorItemNotFound" } });

    await expect(
      invoke(downloadEventAttachment, {
        connection: delegatedConnection(),
        eventId: EVENT_ID,
        attachmentId: ATTACHMENT_ID,
      }),
    ).rejects.toThrow();
  });
});
