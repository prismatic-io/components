import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDealFieldInputs } from "../../inputs";
import { deleteDealFieldExamplePayload } from "../../examplePayloads";
import { deleteDealFieldOutputSchema } from "../../outputSchemas";

export const deleteDealField = action({
  display: {
    label: "Delete Deal Field",
    description: "Deletes a deal field.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/dealFields/${id}`);
    return { data };
  },
  inputs: deleteDealFieldInputs,
  examplePayload: deleteDealFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteDealFieldOutputSchema,
  }),
});
