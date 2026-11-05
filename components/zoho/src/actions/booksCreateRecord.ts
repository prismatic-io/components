import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { booksCreateRecordExamplePayload } from "../examplePayloads/books";
import {
  booksRecordType,
  connectionInput,
  dynamicValues,
  fieldValues,
  parentRecordId,
} from "../inputs";

const booksCreateRecord = action({
  display: {
    label: "Books - Create Record",
    description: "Create a Zoho Books record.",
  },
  inputs: {
    connection: connectionInput,
    recordType: booksRecordType,
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
    { connection, recordType, parentRecordType, parentRecordId, dynamicValues, fieldValues },
  ) => {
    const booksClient = createClient(connection, ClientType.BOOKS, context.debug.enabled);

    const payload = {
      ...util.types.keyValPairListToObject((dynamicValues as KeyValuePair[]) || []),
      ...fieldValues,
    };

    const url =
      parentRecordType && parentRecordId
        ? `/${parentRecordType}/${parentRecordId}/${recordType}`
        : `/${recordType}`;

    const { data } = await booksClient.request({
      method: "POST",
      url,
      data: payload,
    });

    return data;
  },
  examplePayload: booksCreateRecordExamplePayload,
});

export default booksCreateRecord;
