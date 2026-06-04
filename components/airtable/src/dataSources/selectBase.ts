import { dataSource } from "@prismatic-io/spectral";
import { createAirtableClient } from "../client";
import { selectBaseInputs } from "../inputs";
import type { AirtableBase } from "../types";
import { paginateData } from "../util";

export const selectBase = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Base",
    description: "Select an Airtable base from a dropdown.",
  },
  inputs: selectBaseInputs,
  perform: async (context, params) => {
    const client = createAirtableClient(params.airtableConnection);
    const data = await paginateData<AirtableBase>(
      client,
      "/v0/meta/bases",
      "bases",
      {},
      true,
    );

    return {
      result: data.map((base) => ({
        key: base.id,
        label: params.includeId ? `${base.name} (id: ${base.id})` : base.name,
      })),
    };
  },
});
