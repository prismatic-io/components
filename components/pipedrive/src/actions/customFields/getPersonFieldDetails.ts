import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFieldDetailsInputs } from "../../inputs";
import { getPersonFieldDetailsExamplePayload } from "../../examplePayloads";
import { getPersonFieldDetailsOutputSchema } from "../../outputSchemas";
export const getPersonFieldDetails = action({
  display: {
    label: "Get Person Field Details",
    description: "Gets details of a specific field for a person.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fieldId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/personFields/${fieldId}`);
    return { data };
  },
  inputs: getPersonFieldDetailsInputs,
  examplePayload: getPersonFieldDetailsExamplePayload,
  examplePerform: async () => getPersonFieldDetailsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFieldDetailsOutputSchema,
  }),
});
