import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, organizationIdInput } from "../../inputs";

export const getOrganizationUsers = action({
  display: {
    label: "Get Organization Users",
    description: "Lists permitted users for an organization.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/permittedUsers`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
  },
});
