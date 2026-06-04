import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid, email } from "../../inputs";
import { inviteUserToOrganizationExamplePayload } from "../../examplePayloads";

export const inviteUserToOrganization = action({
  display: {
    label: "Invite User to Organization",
    description: "Invites a user to an organization.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.post(`/organizations/${uuid}/invitations`);
    return { data };
  },
  inputs: {
    connection,
    uuid: { ...uuid, comments: "The UUID of the organization." },
    email: {
      ...email,
      required: true,
      comments: "The email address of the user to invite.",
    },
  },
  examplePayload: inviteUserToOrganizationExamplePayload,
});
