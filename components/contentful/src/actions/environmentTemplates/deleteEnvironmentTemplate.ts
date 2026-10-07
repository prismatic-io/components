import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { deleteEnvironmentTemplateExamplePayload } from "../../examplePayloads";
import { deleteEnvironmentTemplateInputs } from "../../inputs";
export const deleteEnvironmentTemplate = action({
  display: {
    label: "Delete Environment Template",
    description: "Deletes an existing environment template.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteEnvironmentTemplateExamplePayload,
  examplePayload: deleteEnvironmentTemplateExamplePayload,
});
