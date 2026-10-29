import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listFunctionsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  connectionInput,
  count,
  cursor,
  fetchAll,
  region,
  resourceType,
} from "../../inputs";

export const listFunctions = action({
  display: {
    label: "List Functions",
    description: "Lists all Functions in a Workspace.",
  },
  inputs: {
    connectionInput,
    region,
    resourceType,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, count, cursor, fetchAll, resourceType },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/functions",
      params: { resourceType: resourceType || undefined },
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listFunctionsExamplePayload,
  },
});
