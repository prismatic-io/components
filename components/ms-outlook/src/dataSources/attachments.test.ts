import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { ATTACHMENT_METADATA_SELECT } from "../constants";
import {
  listEventAttachmentsExamplePayload,
  listMessageAttachmentsExamplePayload,
  selectEventAttachmentExamplePayload,
  selectMessageAttachmentExamplePayload,
} from "../examplePayloads";
import { delegatedConnection, GRAPH_HOST } from "../testHelpers";
import { selectEventAttachment } from "./selectEventAttachment";
import { selectMessageAttachment } from "./selectMessageAttachment";

const MESSAGE_ID = "AAMkAGUAAAwTW09AAA=";
const EVENT_ID = "AAMkAGIAAAoZDOFAAA=";
const METADATA_QUERY = { $select: ATTACHMENT_METADATA_SELECT };
const EMPTY_LIST = { "@odata.context": "context", value: [] };

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("selectMessageAttachment", () => {
  test("maps each attachment to a name label and id key, leaving out reference attachments", async () => {
    const [fileAttachment] = listMessageAttachmentsExamplePayload.data.value;
    nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, {
        value: [
          fileAttachment,
          {
            "@odata.type": "#microsoft.graph.referenceAttachment",
            id: "reference-id",
            name: "Budget.xlsx",
          },
        ],
      });

    const result = await invokeDataSource(selectMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    expect(result).toEqual(selectMessageAttachmentExamplePayload);
  });

  test("returns an empty list when the message has no attachments", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/messages/${MESSAGE_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, EMPTY_LIST);

    const result = await invokeDataSource(selectMessageAttachment, {
      connection: delegatedConnection(),
      messageId: MESSAGE_ID,
    });

    expect(result.result).toEqual([]);
  });
});

describe("selectEventAttachment", () => {
  test("maps each attachment to a name label and id key", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, listEventAttachmentsExamplePayload.data);

    const result = await invokeDataSource(selectEventAttachment, {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
    });

    expect(result).toEqual(selectEventAttachmentExamplePayload);
  });

  test("returns an empty list when the event has no attachments", async () => {
    nock(GRAPH_HOST)
      .get(`/v1.0/me/events/${EVENT_ID}/attachments`)
      .query(METADATA_QUERY)
      .reply(200, EMPTY_LIST);

    const result = await invokeDataSource(selectEventAttachment, {
      connection: delegatedConnection(),
      eventId: EVENT_ID,
    });

    expect(result.result).toEqual([]);
  });
});
