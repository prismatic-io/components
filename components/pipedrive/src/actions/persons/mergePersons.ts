import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mergePersonsInputs } from "../../inputs";
import { mergePersonsExamplePayload } from "../../examplePayloads";
import { mergePersonsOutputSchema } from "../../outputSchemas";
export const mergePersons = action({
  display: {
    label: "Merge Persons",
    description: "Merges two persons.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, mergeWithId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/persons/${id}/merge`, {
      merge_with_id: mergeWithId,
    });
    return { data };
  },
  inputs: mergePersonsInputs,
  examplePayload: mergePersonsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mergePersonsOutputSchema,
  }),
});
