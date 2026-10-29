import { dataSource, util } from "@prismatic-io/spectral";
import { createAirtableClient } from "../client";
import { selectRecordInputs } from "../inputs";
import type { AirtableRecord } from "../types";
import { paginateData } from "../util";

export const selectRecord = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Record",
    description: "Select a record from a table.",
  },
  inputs: selectRecordInputs,
  perform: async (
    context,
    { airtableConnection, baseId, tableName, includeId },
  ) => {
    const client = createAirtableClient(airtableConnection);

    const data = await paginateData<AirtableRecord>(
      client,
      `/v0/${baseId}/${tableName}`,
      "records",
      {},
      true,
    );

    return {
      result: data.map((record) => {
        const label = includeId
          ? `${record.fields.Name} (id: ${record.id})`
          : record.fields.Name;
        return {
          key: record.id,
          label: util.types.toString(label),
        };
      }),
    };
  },
});
