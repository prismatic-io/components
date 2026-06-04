import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectRecordInputs } from "../inputs";
import type { Record } from "../types/Record";

export const selectRecord = dataSource({
  display: {
    label: "Select Record",
    description: "Select a record from a list of records",
  },
  inputs: selectRecordInputs,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, recordType, query, limit, offset, recordField },
  ) => {
    const client = await createClient(connection, "record", false);
    const { data } = await client.get(`/${recordType}`, {
      params: {
        q: query,
        limit: limit,
        offset: offset,
      },
    });
    const records: Record[] = data.items;

    return {
      result: records.map<Element>((record) => ({
        key: record.id,
        label: recordField ? record[recordField] : record.id,
      })),
    };
  },
});
