import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectFunction = dataSource({
  display: {
    label: "Select Function",
    description: "A picklist of Functions available in your Segment workspace.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/functions", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.functions) {
      const result = data.data.functions
        .map((fn: { id: string; displayName: string }) => ({
          label: fn.displayName,
          key: fn.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        );
      return { result };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "PAPI Source Function",
        key: "sfnc_wXzcDGFR3KmjLDrtSawNHf",
      },
    ],
  },
});
