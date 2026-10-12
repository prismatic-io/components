import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteLeadLabelInputs } from "../../inputs";
import { deleteLeadLabelExamplePayload } from "../../examplePayloads";
import { deleteLeadLabelOutputSchema } from "../../outputSchemas";
export const deleteLeadLabel = action({
  display: {
    label: "Delete Lead Label",
    description: "Deletes a lead label.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/leadLabels/${id}`);
    return { data };
  },
  inputs: deleteLeadLabelInputs,
  examplePayload: deleteLeadLabelExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteLeadLabelOutputSchema,
  }),
});
