import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFiltersInputs } from "../../inputs";
import { getFiltersExamplePayload } from "../../examplePayloads";
import { getFiltersOutputSchema } from "../../outputSchemas";
export const getFilters = action({
  display: {
    label: "Get Filters",
    description: "Gets all filters.",
  },
  performSafety: "safe",
  perform: async (context, { connection, type }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/filters", { params: { type } });
    return { data };
  },
  inputs: getFiltersInputs,
  examplePayload: getFiltersExamplePayload,
  examplePerform: async () => getFiltersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFiltersOutputSchema,
  }),
});
