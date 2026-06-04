import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const destination = dataSource({
  display: {
    label: "Fetch Destination",
    description: "Fetch an array of Destination",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get(`/destinations`, {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.destinations) {
      const result = data.data.destinations.map(
        (destination: { id: string; metadata: { name: string } }) => ({
          label: destination.metadata.name,
          key: destination.id,
        }),
      );
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Amazon Kinesis",
        key: "5GFhvtz8fha42Cm4B9E6L8",
      },
    ],
  },
});
