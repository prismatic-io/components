import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listSourceCatalogExamplePayload } from "../../examplePayloads";

export const listSourcesCatalog = action({
  display: {
    label: "Get Sources Catalog",
    description:
      "Returns a list of all available Sources in the Segment catalog.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/catalog/sources`, {
      params: {
        pagination: {
          count: count || undefined,
          cursor: cursor || undefined,
        },
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listSourceCatalogExamplePayload,
  },
});
