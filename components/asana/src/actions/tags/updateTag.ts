import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updateTagExamplePayload } from "../../examplePayloads";
import { updateTagInputs } from "../../inputs";
import { tagResponseSchema } from "../../outputSchemas";
export const updateTag = action({
  display: {
    label: "Update Tag",
    description: "Update the information and metadata of the given tag.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/tags/${params.tagId}`,
      {
        data: {
          color: params.color,
          name: params.name,
          notes: params.notes,
        },
      },
      {
        params: {
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: updateTagInputs,
  examplePayload: updateTagExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: tagResponseSchema,
  }),
});
