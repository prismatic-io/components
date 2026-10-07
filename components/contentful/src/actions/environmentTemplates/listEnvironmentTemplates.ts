import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { listEnvironmentTemplatesExamplePayload } from "../../examplePayloads";
import { listEnvironmentTemplatesInputs } from "../../inputs";
export const listEnvironmentTemplates = action({
  display: {
    label: "List Environment Templates",
    description: "Retrieves all environment templates.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organizationId }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/organizations/${organizationId}/environment_templates`,
    );
    return {
      data,
    };
  },
  inputs: listEnvironmentTemplatesInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listEnvironmentTemplatesExamplePayload,
  examplePayload: listEnvironmentTemplatesExamplePayload,
});
