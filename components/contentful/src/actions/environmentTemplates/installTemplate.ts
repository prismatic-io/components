import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { installTemplateExamplePayload } from "../../examplePayloads";
import { installTemplateInputs } from "../../inputs";

export const installTemplate = action({
  display: {
    label: "Install Template",
    description: "Installs a template to an environment.",
  },
  perform: async (
    context,
    { connection, environmentId, spaceId, templateId },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/spaces/${spaceId}/environments/${environmentId}/template_installations/${templateId}/versions`,
    );
    return {
      data,
    };
  },
  inputs: installTemplateInputs,
  examplePayload: { data: installTemplateExamplePayload },
});
