import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLeadLabelsInputs } from "../../inputs";
import { getLeadLabelsExamplePayload } from "../../examplePayloads";
import { getLeadLabelsOutputSchema } from "../../outputSchemas";
export const getLeadLabels = action({
  display: {
    label: "Get Lead Labels",
    description: "Gets all lead labels.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/leadLabels");
    return { data };
  },
  inputs: getLeadLabelsInputs,
  examplePayload: getLeadLabelsExamplePayload,
  examplePerform: async () => getLeadLabelsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLeadLabelsOutputSchema,
  }),
});
