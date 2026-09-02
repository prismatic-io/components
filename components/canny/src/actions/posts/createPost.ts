import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPostExamplePayload } from "../../examplePayloads";
import { createPostInputs } from "../../inputs";
import { createPostOutputSchema } from "../../outputSchemas";
export const createPost = action({
  display: {
    label: "Create Post",
    description: "Creates a new feedback post.",
  },
  inputs: createPostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPostOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      boardIdRequired,
      authorIdRequired,
      title,
      details,
      categoryId,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/create", {
      authorID: authorIdRequired,
      boardID: boardIdRequired,
      title,
      details,
      categoryID: categoryId,
      customFields: additionalFields.customFields,
      eta: additionalFields.eta,
      etaPublic: additionalFields.etaPublic,
      imageURLs: additionalFields.imageURLs,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createPostExamplePayload,
  examplePayload: createPostExamplePayload,
});
