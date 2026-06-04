import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectDataStore = dataSource({
  display: {
    label: "Select Data Store",
    description: "Select a data store from your Qlik account.",
  },
  inputs: { connection: connectionInput },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/data-stores");
    const items: { id: string; name: string }[] = data?.data ?? [];

    return {
      result: items
        .map((item) => ({
          label: item.name,
          key: item.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Data Store",
        key: "edaeaff0-faa1-41c4-a479-03ff004839dc",
      },
    ],
  },
});
