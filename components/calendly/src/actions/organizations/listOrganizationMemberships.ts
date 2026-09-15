import { action, outputSchema } from "@prismatic-io/spectral";
import { listOrganizationMembershipsOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listOrganizationMembershipsInputs } from "../../inputs";
import { listOrganizationMembershipsExamplePayload } from "../../examplePayloads";
import { getOrganizationMemberships } from "../../util";
export const listOrganizationMemberships = action({
  display: {
    label: "List Organization Memberships",
    description:
      "Lists the Organization Memberships for all users belonging to an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, email, organization, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await getOrganizationMemberships(
      client,
      email,
      organization,
      user,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listOrganizationMembershipsExamplePayload.data,
  }),
  inputs: listOrganizationMembershipsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOrganizationMembershipsOutputSchema,
  }),
  examplePayload: listOrganizationMembershipsExamplePayload,
});
