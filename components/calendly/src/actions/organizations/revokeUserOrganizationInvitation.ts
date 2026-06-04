import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid, orgUuid } from "../../inputs";

export const revokeUserOrganizationInvitation = action({
  display: {
    label: "Revoke User's Organization Invitation",
    description:
      "Use this to revoke an Organization Invitation to an organization.",
  },
  perform: async (context, { connection, uuid, orgUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.delete(
      `/organizations/${orgUuid}/invitations/${uuid}`,
    );
    return { data };
  },
  inputs: {
    connection,
    uuid: {
      ...uuid,
      comments: "The organization invitation's unique identifier.",
    },
    orgUuid,
  },
});
