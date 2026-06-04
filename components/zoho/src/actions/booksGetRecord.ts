import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { booksGetRecordExamplePayload } from "../examplePayloads/books";
import { booksRecordType, connectionInput, parentRecordId, recordId } from "../inputs";
import { getBooksUrl } from "../util/general";

const booksGetRecord = action({
  display: {
    label: "Books - Get Record",
    description: "Get a single Zoho Books record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: booksRecordType,
    recordId: { ...recordId, dataSource: "selectBooksRecord" },
    parentRecordType: {
      ...booksRecordType,
      label: "Parent Record Type",
      placeholder: "Parent Record Type",
      required: false,
    },
    parentRecordId: { ...parentRecordId, dataSource: "selectBooksRecord" },
  },
  perform: async (
    context,
    { connection, recordType, recordId, parentRecordType, parentRecordId },
  ) => {
    const booksClient = createClient(connection, ClientType.BOOKS, context.debug.enabled);

    const url = getBooksUrl(parentRecordType, parentRecordId, recordType, recordId);

    const { data } = await booksClient.request({
      method: "GET",
      url,
    });

    return data;
  },
  examplePayload: booksGetRecordExamplePayload,
});

export default booksGetRecord;
