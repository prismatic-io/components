import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  count,
  cursor,
  region,
  resourceType,
} from "../../inputs";
import { listFunctionsExamplePayload } from "../../examplePayloads";

export const listFunctions = action({
  display: {
    label: "List Functions",
    description: "Lists all Functions in a Workspace.",
  },
  inputs: {
    connectionInput,
    region,
    resourceType,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, count, cursor, resourceType },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/functions`, {
      params: {
        pagination: {
          count: count || undefined,
          cursor: cursor || undefined,
        },
        resourceType: resourceType || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listFunctionsExamplePayload,
  },
});
