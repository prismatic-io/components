import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { deactivateAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { deactivateAgentInputs as inputs } from "../../inputs";
import { agentOutputSchema } from "../../outputSchemas";
export const deactivateAgent = action({
  display: {
    label: "Deactivate Agent",
    description: "Deactivates an agent by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, agentId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.delete(`/agents/${agentId}`);
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: agentOutputSchema,
  }),
  inputs,
  examplePayload,
});
