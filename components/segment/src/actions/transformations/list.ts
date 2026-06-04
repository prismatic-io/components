import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listTransformationExamplePayload } from "../../examplePayloads";

export const listTransformations = action({
  display: {
    label: "List Transformations",
    description: "Returns a list of Transformations.",
  },
  inputs: {
    connectionInput,
    region,
    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get("/transformations", {
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
    data: listTransformationExamplePayload,
  },
});
