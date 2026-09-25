import { action, outputSchema } from "@prismatic-io/spectral";
import { getSectionInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { getSectionOutputSchema } from "../../outputSchemas";
import type { Section } from "../../types";
import { getSectionExamplePayload } from "../../examplePayloads";
export const getSection = action({
  display: {
    label: "Get Section",
    description: "Get a section from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { locale, sectionId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      section: Section;
    }>(`/help_center/${locale}/sections/${sectionId}`);
    return { data };
  },
  inputs: getSectionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSectionOutputSchema,
  }),
  examplePayload: getSectionExamplePayload,
});
