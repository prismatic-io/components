import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserRoleSettingsInputs } from "../../inputs";
import { getUserRoleSettingsExamplePayload } from "../../examplePayloads";
import { getUserRoleSettingsOutputSchema } from "../../outputSchemas";
export const getUserRoleSettings = action({
  display: {
    label: "Get User Role Settings",
    description: "Lists user role settings.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/roleSettings`);
    return { data };
  },
  inputs: getUserRoleSettingsInputs,
  examplePayload: getUserRoleSettingsExamplePayload,
  examplePerform: async () => getUserRoleSettingsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserRoleSettingsOutputSchema,
  }),
});
