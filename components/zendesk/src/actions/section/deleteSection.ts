import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteSectionExamplePayload } from "../../examplePayloads";
import { deleteSectionInputs } from "../../inputs";
import { deleteSectionOutputSchema } from "../../outputSchemas";
export const deleteSection = action({
  display: {
    label: "Delete Section",
    description:
      "Delete a section in the Help Center. Deleting a section also deletes all of its articles.",
  },
  performSafety: "notAllowed",
  perform: async (context, { sectionId, locale, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/help_center/${locale}/sections/${sectionId}.json`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteSectionExamplePayload,
  inputs: deleteSectionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSectionOutputSchema,
  }),
  examplePayload: deleteSectionExamplePayload,
});
