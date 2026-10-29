import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCallLogInputs } from "../../inputs";
import { deleteCallLogExamplePayload } from "../../examplePayloads";
import { deleteCallLogOutputSchema } from "../../outputSchemas";

export const deleteCallLog = action({
  display: {
    label: "Delete Call Log",
    description: "Deletes a call log.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/callLogs/${id}`);
    return { data };
  },
  inputs: deleteCallLogInputs,
  examplePayload: deleteCallLogExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCallLogOutputSchema,
  }),
});
