import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { updateSectionExamplePayload } from "../../examplePayloads";
import { updateSectionInputs } from "../../inputs";
import { updateSectionOutputSchema } from "../../outputSchemas";
import type { Section } from "../../types";
export const updateSection = action({
  display: {
    label: "Update Section",
    description: "Update a section in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      categoryId,
      parentSectionId,
      position,
      sectionDescription,
      sectionName,
      locale,
      sectionId,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      section: {
        category_id: categoryId,
        name: sectionName,
        description: sectionDescription,
        position: position,
        parent_section_id: parentSectionId,
      },
    };
    const { data } = await client.put<{
      section: Section;
    }>(`/help_center/${locale}/sections/${sectionId}`, payload);
    return { data };
  },
  examplePerform: async (
    _context,
    { locale, position, sectionDescription, sectionId, sectionName },
  ) => ({
    data: {
      ...updateSectionExamplePayload.data,
      section: {
        ...updateSectionExamplePayload.data.section,
        ...(sectionId ? { id: sectionId } : {}),
        ...(sectionName ? { name: sectionName } : {}),
        ...(sectionDescription ? { description: sectionDescription } : {}),
        ...(locale ? { locale } : {}),
        ...(position ? { position } : {}),
      },
    },
  }),
  inputs: updateSectionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSectionOutputSchema,
  }),
  examplePayload: updateSectionExamplePayload,
});
