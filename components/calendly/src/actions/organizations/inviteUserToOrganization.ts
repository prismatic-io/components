import { action, outputSchema } from "@prismatic-io/spectral";
import { inviteUserToOrganizationOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { inviteUserToOrganizationInputs } from "../../inputs";
import { inviteUserToOrganizationExamplePayload } from "../../examplePayloads";
export const inviteUserToOrganization = action({
  display: {
    label: "Invite User to Organization",
    description: "Invites a user to an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.post(`/organizations/${uuid}/invitations`);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: inviteUserToOrganizationExamplePayload.data,
  }),
  inputs: inviteUserToOrganizationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: inviteUserToOrganizationOutputSchema,
  }),
  examplePayload: inviteUserToOrganizationExamplePayload,
});
