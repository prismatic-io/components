import { action } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { booksGetRecordsExamplePayload } from "../examplePayloads/books";
import {
  booksRecordType,
  connectionInput,
  fetchAll,
  page,
  parentRecordId,
  per_page,
  searchFields,
} from "../inputs";
import { getBooksUrl } from "../util/general";
import { fetchAllPages } from "../util/pagination";

const booksGetRecords = action({
  display: {
    label: "Books - Get Records",
    description: "Get a collection of Zoho Books records.",
  },
  inputs: {
    connection: connectionInput,
    recordType: booksRecordType,
    parentRecordType: {
      ...booksRecordType,
      label: "Parent Record Type",
      placeholder: "Select parent record type",
      required: false,
    },
    parentRecordId: { ...parentRecordId, dataSource: "selectBooksRecord" },
    searchFields,
    page,
    per_page,
    fetchAll,
  },
  perform: async (
    context,
    {
      connection,
      recordType,
      parentRecordType,
      parentRecordId,
      searchFields,
      page,
      per_page,
      fetchAll,
    },
  ) => {
    const booksClient = createClient(connection, ClientType.BOOKS, context.debug.enabled);

    const url = getBooksUrl(parentRecordType, parentRecordId, recordType);
    const params = Object.fromEntries(
      Object.entries({
        ...searchFields,
        page,
        per_page,
      }).filter(([_key, val]) => Boolean(val)),
    );

    const data = await fetchAllPages(booksClient, url, params, recordType, fetchAll);
    return { data };
  },
  examplePayload: booksGetRecordsExamplePayload,
});

export default booksGetRecords;
