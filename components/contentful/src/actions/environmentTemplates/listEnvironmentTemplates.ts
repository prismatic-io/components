import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { listEnvironmentTemplatesInputs } from "../../inputs";

export const listEnvironmentTemplates = action({
  display: {
    label: "List Environment Templates",
    description: "Retrieves all environment templates.",
  },
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
  examplePayload: { data: {} },
});
