import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { addServiceDeskOrganizationExamplePayload } from "../../examplePayloads";
import { addServiceDeskOrganizationInputs } from "../../inputs";

export const addServiceDeskOrganization = action({
  display: {
    label: "Add Organization to Service Desk",
    description: "Links an organization to the specified service desk.",
  },
  inputs: addServiceDeskOrganizationInputs,
  perform: async (context, { connection, serviceDeskId, organizationId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.post(`/servicedesk/${serviceDeskId}/organization`, {
      organizationId,
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: addServiceDeskOrganizationExamplePayload,
});
