import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const sources = dataSource({
  display: {
    label: "Fetch Sources",
    description: "Fetch an array of Sources",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get(`/sources`, {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.sources) {
      const result = data.sources.map(
        (source: { id: string; slug: string }) => ({
          label: source.slug,
          key: source.id,
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
        label: "web",
        key: "rh5BDZp6QDHvXFCkibm1pR",
      },
    ],
  },
});
