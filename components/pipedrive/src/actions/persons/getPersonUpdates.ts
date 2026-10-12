import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonUpdatesInputs } from "../../inputs";
import { getPersonUpdatesExamplePayload } from "../../examplePayloads";
import { getPersonUpdatesOutputSchema } from "../../outputSchemas";
export const getPersonUpdates = action({
  display: {
    label: "Get Person Updates",
    description: "Lists updates about a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {}, allChanges, items },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/flow`, {
      params: { start, limit, all_changes: allChanges, items },
    });
    return { data };
  },
  inputs: getPersonUpdatesInputs,
  examplePayload: getPersonUpdatesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonUpdatesOutputSchema,
  }),
});
