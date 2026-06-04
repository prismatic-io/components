import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listDestinationCatalogExamplePayload } from "../../examplePayloads";

export const listDestinationCatalog = action({
  display: {
    label: "Get Destination Catalog",
    description:
      "Returns a list of all available Destinations in the Segment catalog.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/catalog/destinations`, {
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
    data: listDestinationCatalogExamplePayload,
  },
});
