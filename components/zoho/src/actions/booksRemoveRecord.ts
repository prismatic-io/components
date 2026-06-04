import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { booksRemoveRecordExamplePayload } from "../examplePayloads/books";
import { booksRecordType, connectionInput, parentRecordId, recordId } from "../inputs";

const booksRemoveRecord = action({
  display: {
    label: "Books - Remove Record",
    description: "Remove a Zoho Books record.",
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

    const url =
      parentRecordType && parentRecordId
        ? `/${parentRecordType}/${parentRecordId}/${recordType}/${recordId}`
        : `/${recordType}/${recordId}`;

    const { data } = await booksClient.request({
      method: "DELETE",
      url,
    });

    return data;
  },
  examplePayload: booksRemoveRecordExamplePayload,
});

export default booksRemoveRecord;
