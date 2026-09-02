import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePostExamplePayload } from "../../examplePayloads";
import { updatePostInputs } from "../../inputs";
import { updatePostOutputSchema } from "../../outputSchemas";
export const updatePost = action({
  display: {
    label: "Update Post",
    description: "Updates an existing post.",
  },
  inputs: updatePostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePostOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, postId, titleOptional, detailsOptional, additionalFields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/update", {
      postID: postId,
      title: titleOptional,
      details: detailsOptional,
      customFields: additionalFields.customFields,
      eta: additionalFields.eta,
      imageURLs: additionalFields.imageURLs,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updatePostExamplePayload,
  examplePayload: updatePostExamplePayload,
});
