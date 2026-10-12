import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationUsersInputs } from "../../inputs";
import { getOrganizationUsersExamplePayload } from "../../examplePayloads";
import { getOrganizationUsersOutputSchema } from "../../outputSchemas";
export const getOrganizationUsers = action({
  display: {
    label: "Get Organization Users",
    description: "Lists permitted users for an organization.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/permittedUsers`);
    return { data };
  },
  inputs: getOrganizationUsersInputs,
  examplePayload: getOrganizationUsersExamplePayload,
  examplePerform: async () => getOrganizationUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationUsersOutputSchema,
  }),
});
