import { action, outputSchema } from "@prismatic-io/spectral";
import { createTemplateOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { type TemplateCreateQuery, TemplateEnum } from "klaviyo-api";
import { createTemplateInputs as inputs } from "../../inputs";
import { createTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createTemplate = action({
  display: {
    label: "Create Template",
    description: "Create a new custom HTML template.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, templateName, editorType, templateHtml, templateText },
  ) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        templateName,
        editorType,
        templateHtml,
        templateText,
        debug,
      });
    }
    const template: TemplateCreateQuery = {
      data: {
        type: TemplateEnum.Template,
        attributes: {
          name: templateName,
          editorType: editorType,
          html: templateHtml,
          text: templateText,
        },
      },
    };
    const { body } = await templatesApi.createTemplate(template);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTemplateOutputSchema,
  }),
  examplePayload: createTemplateExamplePayload,
});
