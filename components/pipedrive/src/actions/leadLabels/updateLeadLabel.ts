import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateLeadLabelInputs } from "../../inputs";
import { updateLeadLabelExamplePayload } from "../../examplePayloads";
import { updateLeadLabelOutputSchema } from "../../outputSchemas";

export const updateLeadLabel = action({
  display: {
    label: "Update Lead Label",
    description: "Updates a lead label.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id, name, color }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/leadLabels/${id}`, { name, color });
    return { data };
  },
  inputs: updateLeadLabelInputs,
  examplePayload: updateLeadLabelExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateLeadLabelOutputSchema,
  }),
});
