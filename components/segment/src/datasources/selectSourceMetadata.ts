import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectSourceMetadata = dataSource({
  display: {
    label: "Select Source Metadata",
    description:
      "A picklist of available Source types from the Segment catalog.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/catalog/sources", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.sourcesCatalog) {
      const result = data.data.sourcesCatalog
        .map((item: { id: string; name: string }) => ({
          label: item.name,
          key: item.id,
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
        label: "Stripe",
        key: "1bow82lmk",
      },
    ],
  },
});
