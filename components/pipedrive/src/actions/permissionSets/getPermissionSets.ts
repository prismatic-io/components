import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPermissionSetsInputs } from "../../inputs";
import { getPermissionSetsExamplePayload } from "../../examplePayloads";
import { getPermissionSetsOutputSchema } from "../../outputSchemas";

export const getPermissionSets = action({
  display: {
    label: "Get Permission Sets",
    description: "Gets all permission sets.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/permissionSets");
    return { data };
  },
  inputs: getPermissionSetsInputs,
  examplePayload: getPermissionSetsExamplePayload,
  examplePerform: async () => getPermissionSetsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPermissionSetsOutputSchema,
  }),
});
