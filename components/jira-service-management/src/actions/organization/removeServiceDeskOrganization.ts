import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { removeServiceDeskOrganizationExamplePayload } from "../../examplePayloads";
import { removeServiceDeskOrganizationInputs } from "../../inputs";

export const removeServiceDeskOrganization = action({
  display: {
    label: "Remove Organization from Service Desk",
    description: "Unlinks an organization from the specified service desk.",
  },
  inputs: removeServiceDeskOrganizationInputs,
  perform: async (context, { connection, serviceDeskId, organizationId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.delete(`/servicedesk/${serviceDeskId}/organization`, {
      data: { organizationId },
      headers: { "Content-Type": "application/json" },
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: removeServiceDeskOrganizationExamplePayload,
});
