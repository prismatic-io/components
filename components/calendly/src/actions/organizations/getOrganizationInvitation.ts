import { action, outputSchema } from "@prismatic-io/spectral";
import { getOrganizationInvitationOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getOrganizationInvitationInputs } from "../../inputs";
import { getOrganizationInvitationExamplePayload } from "../../examplePayloads";
export const getOrganizationInvitation = action({
  display: {
    label: "Get Organization Invitation",
    description:
      "Returns an Organization Invitation that was sent to the organization's members.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid, orgUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/organizations/${orgUuid}/invitations/${uuid}`,
    );
    return { data };
  },
  inputs: getOrganizationInvitationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationInvitationOutputSchema,
  }),
  examplePayload: getOrganizationInvitationExamplePayload,
});
