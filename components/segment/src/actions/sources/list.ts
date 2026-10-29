import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSourcesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listSources = action({
  display: {
    label: "List Sources",
    description: "Returns a list of Sources.",
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
      endpoint: "/sources",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listSourcesExamplePayload,
  },
});
