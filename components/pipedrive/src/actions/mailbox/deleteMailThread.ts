import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteMailThreadInputs } from "../../inputs";
import { deleteMailThreadExamplePayload } from "../../examplePayloads";
import { deleteMailThreadOutputSchema } from "../../outputSchemas";
export const deleteMailThread = action({
  display: {
    label: "Delete Mail Thread",
    description: "Deletes a mail thread.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/mailbox/mailThreads/${id}`);
    return { data };
  },
  inputs: deleteMailThreadInputs,
  examplePayload: deleteMailThreadExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMailThreadOutputSchema,
  }),
});
