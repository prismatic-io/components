import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFeedExamplePayload } from "../../examplePayloads/feeds";
import { createFeedInputs } from "../../inputs";
import { createFeedOutputSchema } from "../../outputSchemas";

export const createFeed = action({
  display: {
    label: "Create Feed",
    description:
      "Creates a feed. Upload the contents of the feed document before calling this operation.",
  },
  examplePayload: createFeedExamplePayload,
  inputs: createFeedInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFeedOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      feedType,
      marketplaceIds,
      inputFeedDocumentId,
      feedOptions,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/feeds/2021-06-30/feeds", {
      feedType: feedType || undefined,
      marketplaceIds: marketplaceIds || undefined,
      inputFeedDocumentId: inputFeedDocumentId || undefined,
      feedOptions: feedOptions || undefined,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createFeedExamplePayload,
});
