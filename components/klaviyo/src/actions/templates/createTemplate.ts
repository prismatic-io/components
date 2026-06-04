import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { type TemplateCreateQuery, TemplateEnum } from "klaviyo-api";
import { createTemplateInputs as inputs } from "../../inputs/templates";
import { createTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const createTemplate = action({
  display: {
    label: "Create Template",
    description: "Create a new custom HTML template.",
  },
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
          name: templateName!,
          editorType: editorType!,
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
  examplePayload: createTemplateExamplePayload,
});
