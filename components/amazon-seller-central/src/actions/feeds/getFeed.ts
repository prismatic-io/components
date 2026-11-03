import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFeedExamplePayload } from "../../examplePayloads/feeds";
import { getFeedInputs } from "../../inputs";
import { getFeedOutputSchema } from "../../outputSchemas";

export const getFeed = action({
  display: {
    label: "Get Feed",
    description:
      "Returns feed details (including the resultDocumentId, if available) for the specified feed.",
  },
  examplePayload: getFeedExamplePayload,
  inputs: getFeedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFeedOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, feedId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/feeds/2021-06-30/feeds/${feedId}`);
    return {
      data,
    };
  },
  examplePerform: async () => getFeedExamplePayload,
});
