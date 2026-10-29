import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFilterInputs } from "../../inputs";
import { getFilterExamplePayload } from "../../examplePayloads";
import { getFilterOutputSchema } from "../../outputSchemas";

export const getFilter = action({
  display: {
    label: "Get Filter",
    description: "Gets one filter.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/filters/${id}`);
    return { data };
  },
  inputs: getFilterInputs,
  examplePayload: getFilterExamplePayload,
  examplePerform: async () => getFilterExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFilterOutputSchema,
  }),
});
