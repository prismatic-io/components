import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, region } from "../inputs";

export const selectTransformation = dataSource({
  display: {
    label: "Select Transformation",
    description:
      "A picklist of Transformations available in your Segment workspace.",
  },
  inputs: {
    connection: connectionInput,
    region,
  },
  perform: async (_context, { connection, region }) => {
    const client = createClient(connection, region, false);
    const { data } = await client.get("/transformations", {
      params: {
        pagination: {
          count: 200,
        },
      },
    });
    if (data.data?.transformations) {
      const result = data.data.transformations
        .map((transformation: { id: string; name: string }) => ({
          label: transformation.name,
          key: transformation.id,
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
        label: "updated-name",
        key: "pHrD51Ds35Zjfka84yXQE6",
      },
    ],
  },
});
