import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { getAgentInputs as inputs } from "../../inputs";
import { agentOutputSchema } from "../../outputSchemas";
export const getAgent = action({
  display: {
    label: "Get Agent",
    description: "Retrieves details of an agent by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, agentId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/agents/${agentId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: agentOutputSchema,
  }),
  inputs,
  examplePayload,
});
