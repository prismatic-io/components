import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { updateOrganizationExamplePayload } from "../../examplePayloads";
import { updateOrganizationInputs } from "../../inputs";

export const updateOrganization = action({
  display: {
    label: "Update Organization",
    description: "Updates the security contact for an organization.",
  },
  perform: async (context, { connection, organizationId, securityId }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/organizations/${organizationId}/security_contacts/${securityId}`,
    );
    return {
      data,
    };
  },
  inputs: updateOrganizationInputs,
  examplePayload: { data: updateOrganizationExamplePayload },
});
