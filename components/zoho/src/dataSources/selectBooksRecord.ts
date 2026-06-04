import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { DEFAULT_PER_PAGE } from "../constants";
import { selectBooksRecordExamplePayload } from "../examplePayloads/dataSources";
import { selectBooksRecordInputs } from "../inputs";
import type { BookRecord } from "../types";
import { getBooksRecordIdField, getBooksRecordLabel } from "../util/general";
import { fetchAllPages } from "../util/pagination";

export const selectBooksRecord = dataSource({
  display: {
    label: "Select Books Record",
    description: "Select a Books record from the specified module.",
  },
  inputs: selectBooksRecordInputs,
  perform: async (_context, { connection, recordType, parentRecordId }) => {
    const client = createClient(connection, ClientType.BOOKS, false);

    const url = parentRecordId ? `/${recordType}?parent_id=${parentRecordId}` : `/${recordType}`;

    const response = await fetchAllPages(
      client,
      url,
      { per_page: DEFAULT_PER_PAGE },
      recordType,
      true,
    );

    const records = response[recordType] as BookRecord[];

    if (records?.length) {
      const idField = getBooksRecordIdField(records[0]);

      if (!idField) {
        return { result: [] };
      }

      const result: Element[] = records
        .filter((record) => {
          const idValue = record[idField];
          return idValue != null;
        })
        .map((record) => ({
          label: getBooksRecordLabel(record),
          key: util.types.toString(record[idField]),
        }));
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: selectBooksRecordExamplePayload,
});
