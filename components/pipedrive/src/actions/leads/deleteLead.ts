import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteLeadInputs } from "../../inputs";
import { deleteLeadExamplePayload } from "../../examplePayloads";
import { deleteLeadOutputSchema } from "../../outputSchemas";
export const deleteLead = action({
  display: {
    label: "Delete Lead",
    description: "Deletes a lead.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/leads/${id}`);
    return { data };
  },
  inputs: deleteLeadInputs,
  examplePayload: deleteLeadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteLeadOutputSchema,
  }),
});
