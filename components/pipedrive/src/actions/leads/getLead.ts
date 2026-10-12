import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLeadInputs } from "../../inputs";
import { getLeadExamplePayload } from "../../examplePayloads";
import { getLeadOutputSchema } from "../../outputSchemas";
export const getLead = action({
  display: {
    label: "Get Lead",
    description: "Gets one lead.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/leads/${id}`);
    return { data };
  },
  inputs: getLeadInputs,
  examplePayload: getLeadExamplePayload,
  examplePerform: async () => getLeadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLeadOutputSchema,
  }),
});
