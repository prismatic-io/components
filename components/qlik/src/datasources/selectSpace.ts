import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectSpace = dataSource({
  display: {
    label: "Select Space",
    description: "Select a space from your Qlik account.",
  },
  inputs: { connection: connectionInput },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/spaces");
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
      { label: "Example Space", key: "f5ceaff0-faa1-41c4-a479-03ff004839dc" },
    ],
  },
});
