import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { getAgentInputs as inputs } from "../../inputs/agents";

export const getAgent = action({
  display: {
    label: "Get Agent",
    description: "Retrieves details of an agent by ID.",
  },
  perform: async (context, { connection, agentId }) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await client.get(`/agents/${agentId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
