import { action, outputSchema } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { updateOrganizationExamplePayload } from "../../examplePayloads";
import { updateOrganizationInputs } from "../../inputs";
import { updateOrganizationOutputSchema } from "../../outputSchemas";
export const updateOrganization = action({
  display: {
    label: "Update Organization",
    description: "Updates the security contact for an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organizationId, securityId }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/organizations/${organizationId}/security_contacts/${securityId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateOrganizationExamplePayload,
  inputs: updateOrganizationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateOrganizationOutputSchema,
  }),
  examplePayload: updateOrganizationExamplePayload,
});
