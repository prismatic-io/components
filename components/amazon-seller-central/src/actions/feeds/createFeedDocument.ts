import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createFeedDocumentExamplePayload } from "../../examplePayloads/feeds";
import { createFeedDocumentInputs } from "../../inputs";
import { createFeedDocumentOutputSchema } from "../../outputSchemas";

export const createFeedDocument = action({
  display: {
    label: "Create Feed Document",
    description: "Creates a feed document for the specified feed type.",
  },
  examplePayload: createFeedDocumentExamplePayload,
  inputs: createFeedDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFeedDocumentOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (context, { connectionInput, contentType }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/feeds/2021-06-30/documents", {
      contentType: contentType || undefined,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createFeedDocumentExamplePayload,
});
