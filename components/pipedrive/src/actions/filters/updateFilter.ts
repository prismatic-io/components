import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateFilterInputs } from "../../inputs";
import { updateFilterExamplePayload } from "../../examplePayloads";
import { updateFilterOutputSchema } from "../../outputSchemas";

export const updateFilter = action({
  display: {
    label: "Update Filter",
    description: "Updates a filter.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, name, conditions }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/filters/${id}`, { name, conditions });
    return { data };
  },
  inputs: updateFilterInputs,
  examplePayload: updateFilterExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFilterOutputSchema,
  }),
});
