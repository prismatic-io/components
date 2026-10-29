import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDestinationCatalogExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listDestinationCatalog = action({
  display: {
    label: "Get Destination Catalog",
    description:
      "Returns a list of all available Destinations in the Segment catalog.",
  },
  inputs: {
    connectionInput,
    region,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, fetchAll, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/catalog/destinations",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listDestinationCatalogExamplePayload,
  },
});
