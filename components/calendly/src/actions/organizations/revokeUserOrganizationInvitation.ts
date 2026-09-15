import { action, outputSchema } from "@prismatic-io/spectral";
import { revokeUserOrganizationInvitationOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { revokeUserOrganizationInvitationInputs } from "../../inputs";
import { revokeUserOrganizationInvitationExamplePayload } from "../../examplePayloads";
export const revokeUserOrganizationInvitation = action({
  display: {
    label: "Revoke User's Organization Invitation",
    description: "Revokes an Organization Invitation to an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid, orgUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/organizations/${orgUuid}/invitations/${uuid}`,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: revokeUserOrganizationInvitationExamplePayload.data,
  }),
  inputs: revokeUserOrganizationInvitationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: revokeUserOrganizationInvitationOutputSchema,
  }),
  examplePayload: revokeUserOrganizationInvitationExamplePayload,
});
