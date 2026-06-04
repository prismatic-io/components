import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { deleteTemplateInputs as inputs } from "../../inputs/templates";
import { deleteTemplateExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const deleteTemplate = action({
  display: {
    label: "Delete Template",
    description: "Delete a template with the given template ID.",
  },
  perform: async (context, { connection, templateId }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, templateId, debug });
    }
    await templatesApi.deleteTemplate(templateId!);
    return {
      data: "Template deleted successfully.",
    };
  },
  inputs,
  examplePayload: deleteTemplateExamplePayload,
});
