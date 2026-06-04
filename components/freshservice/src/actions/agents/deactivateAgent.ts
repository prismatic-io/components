import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { deactivateAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { deactivateAgentInputs as inputs } from "../../inputs/agents";

export const deactivateAgent = action({
  display: {
    label: "Deactivate Agent",
    description: "Deactivates an agent by ID.",
  },
  perform: async (context, { connection, agentId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/agents/${agentId}`);

    return { data };
  },
  inputs,
  examplePayload,
});
