import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldInputs } from "../../inputs";
import { getPersonFieldExamplePayload } from "../../examplePayloads";
import { getPersonFieldOutputSchema } from "../../outputSchemas";

export const getPersonField = action({
  display: {
    label: "Get Person Field",
    description: "Gets one person field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/personFields/${id}`);
    return { data };
  },
  inputs: getPersonFieldInputs,
  examplePayload: getPersonFieldExamplePayload,
  examplePerform: async () => getPersonFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFieldOutputSchema,
  }),
});
