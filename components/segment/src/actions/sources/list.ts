import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listSourcesExamplePayload } from "../../examplePayloads";

export const listSources = action({
  display: {
    label: "List Sources",
    description: "Returns a list of Sources.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get("/sources", {
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
    data: listSourcesExamplePayload,
  },
});
