import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { createEnvironmentTemplateExamplePayload } from "../../examplePayloads";
import { createEnvironmentTemplateInputs } from "../../inputs";
export const createEnvironmentTemplate = action({
  display: {
    label: "Create Environment Template",
    description: "Creates a new environment template.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      organizationId,
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
    const { data } = await client.post(
      `/organizations/${organizationId}/environment_templates`,
      body,
    );
    return {
      data,
    };
  },
  inputs: createEnvironmentTemplateInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createEnvironmentTemplateExamplePayload,
  examplePayload: createEnvironmentTemplateExamplePayload,
});
