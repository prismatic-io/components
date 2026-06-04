import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { CustomAccountingField } from "../interfaces/customAccountingField";
import { fetchAllData } from "../util";

export const selectCustomAccountingField = dataSource({
  display: {
    label: "Select Custom Accounting Field",
    description: "Select a custom accounting field from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<CustomAccountingField>(
      client,
      "/accounting/fields",
      {},
      true,
    );

    const objects = data
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((field) => ({
        key: field.id,
        label: field.name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Cost Center", key: "96bb7007-eec5-430f-8d09-e033cbc000c2" }],
  },
});
