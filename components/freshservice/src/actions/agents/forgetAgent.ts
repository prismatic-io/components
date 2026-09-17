import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { forgetAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { forgetAgentInputs as inputs } from "../../inputs";
import { successOutputSchema } from "../../outputSchemas";
export const forgetAgent = action({
  display: {
    label: "Forget Agent",
    description: "Permanently removes an agent and associated data.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, agentId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    await client.delete(`/agents/${agentId}/forget`);
    return SUCCESS_RESPONSE;
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: successOutputSchema,
  }),
  inputs,
  examplePayload,
});
