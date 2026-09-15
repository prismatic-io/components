import { action, outputSchema } from "@prismatic-io/spectral";
import { listOrganizationInvitationsOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listOrganizationInvitationsInputs } from "../../inputs";
import { listOrganizationInvitationsExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";
export const listOrganizationInvitations = action({
  display: {
    label: "List Organization Invitations",
    description:
      "Returns a list of Organization Invitations that were sent to the organization's members.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid, email, sort, status }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, `/organizations/${uuid}/invitations`, {
      email: email,
      sort: sort,
      status: status,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listOrganizationInvitationsExamplePayload.data,
  }),
  inputs: listOrganizationInvitationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOrganizationInvitationsOutputSchema,
  }),
  examplePayload: listOrganizationInvitationsExamplePayload,
});
