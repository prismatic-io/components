import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid, orgUuid } from "../../inputs";
import { getOrganizationInvitationExamplePayload } from "../../examplePayloads";

export const getOrganizationInvitation = action({
  display: {
    label: "Get Organization Invitation",
    description:
      "Returns an Organization Invitation that was sent to the organization's members.",
  },
  perform: async (context, { connection, uuid, orgUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(
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
  examplePayload: getOrganizationInvitationExamplePayload,
});
