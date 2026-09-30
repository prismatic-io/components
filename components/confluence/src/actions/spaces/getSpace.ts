import { action, outputSchema } from "@prismatic-io/spectral";
import { spaceSingleSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getSpaceInputs } from "../../inputs";
import { getSpaceExamplePayload } from "../../examplePayloads";
export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Returns a specific space.",
  },
  inputs: getSpaceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: spaceSingleSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connectionInput, spaceId, queryParameters }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/spaces/${spaceId}`, {
      params: queryParameters,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getSpaceExamplePayload,
  },
});
