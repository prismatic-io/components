import { action, outputSchema } from "@prismatic-io/spectral";
import { removeUserFromOrganizationOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { removeUserFromOrganizationInputs } from "../../inputs";
import { removeUserFromOrganizationExamplePayload } from "../../examplePayloads";
export const removeUserFromOrganization = action({
  display: {
    label: "Remove User from Organization",
    description: "Removes a user from an organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/organization_memberships/${uuid}`);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: removeUserFromOrganizationExamplePayload.data,
  }),
  inputs: removeUserFromOrganizationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeUserFromOrganizationOutputSchema,
  }),
  examplePayload: removeUserFromOrganizationExamplePayload,
});
