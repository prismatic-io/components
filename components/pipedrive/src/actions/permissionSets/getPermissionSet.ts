import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPermissionSetInputs } from "../../inputs";
import { getPermissionSetExamplePayload } from "../../examplePayloads";
import { getPermissionSetOutputSchema } from "../../outputSchemas";

export const getPermissionSet = action({
  display: {
    label: "Get Permission Set",
    description: "Gets one permission set.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/permissionSets/${id}`);
    return { data };
  },
  inputs: getPermissionSetInputs,
  examplePayload: getPermissionSetExamplePayload,
  examplePerform: async () => getPermissionSetExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPermissionSetOutputSchema,
  }),
});
