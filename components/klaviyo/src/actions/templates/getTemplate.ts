import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getTemplateInputs as inputs } from "../../inputs/templates";
import type { FieldsTemplate } from "../../types/FieldsTemplate";
import { getTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getTemplate = action({
  display: {
    label: "Get Template",
    description: "Get a template with the given template ID.",
  },
  perform: async (context, { connection, templateId, fieldsTemplate }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, templateId, fieldsTemplate, debug });
    }
    const { body } = await templatesApi.getTemplate(templateId!, {
      fieldsTemplate: fieldsTemplate as FieldsTemplate[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getTemplateExamplePayload,
});
