import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteTagExamplePayload } from "../../examplePayloads";
import { deleteTagInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const deleteTag = action({
  display: {
    label: "Delete Tag",
    description: "Delete an existing tag.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/tags/${params.tagId}`);
    return { data };
  },
  inputs: deleteTagInputs,
  examplePayload: deleteTagExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
