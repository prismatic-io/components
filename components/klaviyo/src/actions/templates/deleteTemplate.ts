import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteTemplateOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { deleteTemplateInputs as inputs } from "../../inputs";
import { deleteTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const deleteTemplate = action({
  display: {
    label: "Delete Template",
    description: "Delete a template with the given template ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, templateId }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, templateId, debug });
    }
    await templatesApi.deleteTemplate(templateId);
    return {
      data: "Template deleted successfully.",
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTemplateOutputSchema,
  }),
  examplePayload: deleteTemplateExamplePayload,
});
