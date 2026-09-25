import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteSectionExamplePayload } from "../../examplePayloads";
import { deleteSectionInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const deleteSection = action({
  display: {
    label: "Delete Section",
    description: "Delete an existing section.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/sections/${params.sectionId}`);
    return { data };
  },
  inputs: deleteSectionInputs,
  examplePayload: deleteSectionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
