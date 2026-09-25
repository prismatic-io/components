import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createSectionExamplePayload } from "../../examplePayloads";
import { createSectionInputs } from "../../inputs";
import { createSectionOutputSchema } from "../../outputSchemas";
import type { Section } from "../../types";
export const createSection = action({
  display: {
    label: "Create Section",
    description: "Create a section in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      sectionName,
      sectionDescription,
      position,
      categoryId,
      locale,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      section: {
        name: sectionName,
        description: sectionDescription,
        locale,
        position: position,
      },
    };
    const { data } = await client.post<{
      section: Section;
    }>(`/help_center/categories/${categoryId}/sections`, payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { locale, position, sectionDescription, sectionName },
  ) => ({
    data: {
      ...createSectionExamplePayload.data,
      section: {
        ...createSectionExamplePayload.data.section,
        ...(sectionName ? { name: sectionName } : {}),
        ...(sectionDescription ? { description: sectionDescription } : {}),
        ...(locale ? { locale } : {}),
        ...(position ? { position } : {}),
      },
    },
  }),
  inputs: createSectionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSectionOutputSchema,
  }),
  examplePayload: createSectionExamplePayload,
});
