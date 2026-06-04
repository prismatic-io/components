import { dataSource } from "@prismatic-io/spectral";
import { createAirtableClient } from "../client";
import { selectTableInputs } from "../inputs";
import type { AirtableTable } from "../types";
import { paginateData } from "../util";

export const selectTable = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Table",
    description: "Select a table from an Airtable base.",
  },
  inputs: selectTableInputs,
  perform: async (context, params) => {
    const client = createAirtableClient(params.airtableConnection);

    const data = await paginateData<AirtableTable>(
      client,
      `/v0/meta/bases/${params.baseId}/tables`,
      "tables",
      {},
      true,
    );

    return {
      result: data.map((table) => ({
        key: table.id,
        label: params.includeId
          ? `${table.name} (id: ${table.id})`
          : table.name,
      })),
    };
  },
});
