import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCurrenciesInputs } from "../../inputs";
import { getCurrenciesExamplePayload } from "../../examplePayloads";
import { getCurrenciesOutputSchema } from "../../outputSchemas";

export const getCurrencies = action({
  display: {
    label: "Get Currencies",
    description: "Gets all supported currencies.",
  },
  performSafety: "safe",
  perform: async (context, { connection, term }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/currencies", { params: { term } });
    return { data };
  },
  inputs: getCurrenciesInputs,
  examplePayload: getCurrenciesExamplePayload,
  examplePerform: async () => getCurrenciesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrenciesOutputSchema,
  }),
});
