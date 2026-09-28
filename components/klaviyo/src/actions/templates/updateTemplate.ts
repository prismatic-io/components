import { action, outputSchema } from "@prismatic-io/spectral";
import { updateTemplateOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { type TemplateUpdateQuery, TemplateEnum } from "klaviyo-api";
import { updateTemplateInputs as inputs } from "../../inputs";
import { updateTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateTemplate = action({
  display: {
    label: "Update Template",
    description: "Update a template with the given template ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, templateId, templateName, templateHtml, templateText },
  ) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        templateId,
        templateName,
        templateHtml,
        templateText,
        debug,
      });
    }
    const template: TemplateUpdateQuery = {
      data: {
        type: TemplateEnum.Template,
        attributes: {
          name: templateName,
          html: templateHtml,
          text: templateText,
        },
        id: templateId,
      },
    };
    const { body } = await templatesApi.updateTemplate(templateId, template);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTemplateOutputSchema,
  }),
  examplePayload: updateTemplateExamplePayload,
});
