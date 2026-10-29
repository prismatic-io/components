import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFieldInputs } from "../../inputs";
import { getDealFieldExamplePayload } from "../../examplePayloads";
import { getDealFieldOutputSchema } from "../../outputSchemas";

export const getDealField = action({
  display: {
    label: "Get Deal Field",
    description: "Gets one deal field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/dealFields/${id}`);
    return { data };
  },
  inputs: getDealFieldInputs,
  examplePayload: getDealFieldExamplePayload,
  examplePerform: async () => getDealFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFieldOutputSchema,
  }),
});
