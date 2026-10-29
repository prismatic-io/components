import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addLeadLabelInputs } from "../../inputs";
import { addLeadLabelExamplePayload } from "../../examplePayloads";
import { addLeadLabelOutputSchema } from "../../outputSchemas";

export const addLeadLabel = action({
  display: {
    label: "Add Lead Label",
    description: "Adds a lead label.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, name, color }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/leadLabels", { name, color });
    return { data };
  },
  inputs: addLeadLabelInputs,
  examplePayload: addLeadLabelExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addLeadLabelOutputSchema,
  }),
});
