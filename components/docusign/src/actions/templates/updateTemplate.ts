import { action, outputSchema } from "@prismatic-io/spectral";
import { updateTemplateOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateTemplateInputs } from "../../inputs";
import { updateTemplateExamplePayload } from "../../examplePayloads";

export const updateTemplate = action({
  display: {
    label: "Update Template",
    description: "Updates an existing template.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/templates/${templateId}`, jsonInput);
    return { data };
  },
  examplePerform: async () => updateTemplateExamplePayload,
  inputs: updateTemplateInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTemplateOutputSchema,
  }),
  examplePayload: updateTemplateExamplePayload,
});
