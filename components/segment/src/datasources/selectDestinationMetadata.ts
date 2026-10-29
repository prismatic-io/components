import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectDestinationMetadata = dataSource({
  display: {
    label: "Select Destination Metadata",
    description:
      "A picklist of available Destination types from the Segment catalog.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/catalog/destinations", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.destinationsCatalog) {
      const result = data.data.destinationsCatalog
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
        label: "Amplitude",
        key: "54521fd525e721e32a72ee91",
      },
    ],
  },
});
