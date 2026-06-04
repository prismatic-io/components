import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, uuid } from "../../inputs";

export const removeUserFromOrganization = action({
  display: {
    label: "Remove User from Organization",
    description: "Removes a user from an organization.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/organization_memberships/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: {
      ...uuid,
      comments: "The organization membership's unique identifier",
      dataSource: "organizationMemberships",
    },
  },
});
