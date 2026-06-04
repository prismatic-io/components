import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { getEnvironmentTemplateExamplePayload } from "../../examplePayloads";
import { getEnvironmentTemplateInputs } from "../../inputs";

export const getEnvironmentTemplate = action({
  display: {
    label: "Get Environment Template",
    description: "Retrieves a single environment template by ID.",
  },
  perform: async (context, { connection, organizationId, templateId }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/organizations/${organizationId}/environment_templates/${templateId}`,
    );
    return {
      data,
    };
  },
  inputs: getEnvironmentTemplateInputs,
  examplePayload: { data: getEnvironmentTemplateExamplePayload },
});
