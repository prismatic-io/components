import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { updateEnvironmentTemplateExamplePayload } from "../../examplePayloads";
import { updateEnvironmentTemplateInputs } from "../../inputs";
export const updateEnvironmentTemplate = action({
  display: {
    label: "Update Environment Template",
    description: "Updates an existing environment template.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      organizationId,
      templateId,
      name,
      description,
      versionName,
      versionDescription,
      contentTypeTemplates,
      editorInterfaceTemplates,
    },
  ) => {
    const client = createApiClient(connection, context.debug.enabled);
    const body = {
      name,
      description,
      versionName,
      versionDescription,
      entities: {
        contentTypeTemplates,
        editorInterfaceTemplates,
      },
    };
    const { data } = await client.put(
      `/organizations/${organizationId}/environment_templates/${templateId}`,
      body,
    );
    return {
      data,
    };
  },
  inputs: updateEnvironmentTemplateInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateEnvironmentTemplateExamplePayload,
  examplePayload: updateEnvironmentTemplateExamplePayload,
});
