import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { type TemplateUpdateQuery, TemplateEnum } from "klaviyo-api";
import { updateTemplateInputs as inputs } from "../../inputs/templates";
import { updateTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const updateTemplate = action({
  display: {
    label: "Update Template",
    description: "Update a template with the given template ID.",
  },
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
        id: templateId!,
      },
    };
    const { body } = await templatesApi.updateTemplate(templateId!, template);
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: updateTemplateExamplePayload,
});
