import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFieldInputs } from "../../inputs";
import { getProductFieldExamplePayload } from "../../examplePayloads";
import { getProductFieldOutputSchema } from "../../outputSchemas";
export const getProductField = action({
  display: {
    label: "Get Product Field",
    description: "Gets one product field.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/productFields/${id}`);
    return { data };
  },
  inputs: getProductFieldInputs,
  examplePayload: getProductFieldExamplePayload,
  examplePerform: async () => getProductFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFieldOutputSchema,
  }),
});
