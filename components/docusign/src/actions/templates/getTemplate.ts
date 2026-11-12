import { action, outputSchema } from "@prismatic-io/spectral";
import { getTemplateOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getTemplateInputs } from "../../inputs";
import { getTemplateExamplePayload } from "../../examplePayloads";

export const getTemplate = action({
  display: {
    label: "Get Template",
    description: "Retrieves the definition of the specified template.",
  },
  performSafety: "safe",
  perform: async (context, { connection, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/templates/${templateId}`);
    return { data };
  },
  inputs: getTemplateInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTemplateOutputSchema,
  }),
  examplePayload: getTemplateExamplePayload,
});
