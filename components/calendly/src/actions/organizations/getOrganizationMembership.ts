import { action, outputSchema } from "@prismatic-io/spectral";
import { getOrganizationMembershipOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getOrganizationMembershipInputs } from "../../inputs";
import { getOrganizationMembershipExamplePayload } from "../../examplePayloads";
export const getOrganizationMembership = action({
  display: {
    label: "Get Organization Membership",
    description: "Returns information about a user's Organization Membership.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organization_memberships/${uuid}`);
    return { data };
  },
  inputs: getOrganizationMembershipInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationMembershipOutputSchema,
  }),
  examplePayload: getOrganizationMembershipExamplePayload,
});
