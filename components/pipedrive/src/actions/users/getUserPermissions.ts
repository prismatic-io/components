import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserPermissionsInputs } from "../../inputs";
import { getUserPermissionsExamplePayload } from "../../examplePayloads";
import { getUserPermissionsOutputSchema } from "../../outputSchemas";
export const getUserPermissions = action({
  display: {
    label: "Get User Permissions",
    description: "Lists user permissions.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/permissions`);
    return { data };
  },
  inputs: getUserPermissionsInputs,
  examplePayload: getUserPermissionsExamplePayload,
  examplePerform: async () => getUserPermissionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserPermissionsOutputSchema,
  }),
});
