import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mergeDealsInputs } from "../../inputs";
import { mergeDealsExamplePayload } from "../../examplePayloads";
import { mergeDealsOutputSchema } from "../../outputSchemas";
export const mergeDeals = action({
  display: {
    label: "Merge Deals",
    description: "Merges two deals.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/deals/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: mergeDealsInputs,
  examplePayload: mergeDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mergeDealsOutputSchema,
  }),
});
