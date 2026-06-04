import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { deleteEnvironmentTemplateInputs } from "../../inputs";

export const deleteEnvironmentTemplate = action({
  display: {
    label: "Delete Environment Template",
    description: "Deletes an existing environment template.",
  },
  perform: async (context, { connection, organizationId, templateId }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/organizations/${organizationId}/environment_templates/${templateId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteEnvironmentTemplateInputs,
  examplePayload: { data: {} },
});
