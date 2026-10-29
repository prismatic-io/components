import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLeadSourcesInputs } from "../../inputs";
import { getLeadSourcesExamplePayload } from "../../examplePayloads";
import { getLeadSourcesOutputSchema } from "../../outputSchemas";

export const getLeadSources = action({
  display: {
    label: "Get Lead Sources",
    description: "Gets all lead sources.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/leadSources");
    return { data };
  },
  inputs: getLeadSourcesInputs,
  examplePayload: getLeadSourcesExamplePayload,
  examplePerform: async () => getLeadSourcesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLeadSourcesOutputSchema,
  }),
});
