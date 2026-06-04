import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid } from "../../inputs";
import { getOrganizationMembershipExamplePayload } from "../../examplePayloads";

export const getOrganizationMembership = action({
  display: {
    label: "Get Organization Membership",
    description: "Returns information about a user's Organization Membership.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/organization_memberships/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    uuid: {
      ...uuid,
      comments: "The organization membership's unique identifier.",
    },
  },
  examplePayload: getOrganizationMembershipExamplePayload,
});
