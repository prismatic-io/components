import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { booksUpdateRecordExamplePayload } from "../examplePayloads/books";
import {
  booksRecordType,
  connectionInput,
  dynamicValues,
  fieldValues,
  parentRecordId,
  recordId,
} from "../inputs";

const booksUpdateRecord = action({
  display: {
    label: "Books - Update Record",
    description: "Update a Zoho Books record.",
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
    dynamicValues,
    fieldValues,
  },
  perform: async (
    context,
    {
      connection,
      recordType,
      recordId,
      parentRecordType,
      parentRecordId,
      dynamicValues,
      fieldValues,
    },
  ) => {
    const booksClient = createClient(connection, ClientType.BOOKS, context.debug.enabled);

    const payload = {
      ...util.types.keyValPairListToObject((dynamicValues as KeyValuePair[]) || []),
      ...fieldValues,
    };

    const url =
      parentRecordType && parentRecordId
        ? `/${parentRecordType}/${parentRecordId}/${recordType}/${recordId}`
        : `/${recordType}/${recordId}`;

    const { data } = await booksClient.request({
      method: "PUT",
      url,
      data: payload,
    });

    return data;
  },
  examplePayload: booksUpdateRecordExamplePayload,
});

export default booksUpdateRecord;
