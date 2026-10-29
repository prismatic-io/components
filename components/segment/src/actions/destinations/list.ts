import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDestinationsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listDestinations = action({
  display: {
    label: "List Destinations",
    description: "Returns a list of Destinations.",
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
      endpoint: "/destinations",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listDestinationsExamplePayload,
  },
});
