import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserConnectionsInputs } from "../../inputs";
import { getUserConnectionsExamplePayload } from "../../examplePayloads";
import { getUserConnectionsOutputSchema } from "../../outputSchemas";
export const getUserConnections = action({
  display: {
    label: "Get User Connections",
    description: "Gets all user connections.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/userConnections");
    return { data };
  },
  inputs: getUserConnectionsInputs,
  examplePayload: getUserConnectionsExamplePayload,
  examplePerform: async () => getUserConnectionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserConnectionsOutputSchema,
  }),
});
