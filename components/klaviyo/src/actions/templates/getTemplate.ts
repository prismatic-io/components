import { action, outputSchema } from "@prismatic-io/spectral";
import { getTemplateOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getTemplateInputs as inputs } from "../../inputs";
import { getTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsTemplate } from "../../types";
export const getTemplate = action({
  display: {
    label: "Get Template",
    description: "Get a template with the given template ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, templateId, fieldsTemplate }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, templateId, fieldsTemplate, debug });
    }
    const { body } = await templatesApi.getTemplate(templateId, {
      fieldsTemplate: fieldsTemplate as FieldsTemplate[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getTemplateExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTemplateOutputSchema,
  }),
  examplePayload: getTemplateExamplePayload,
});
