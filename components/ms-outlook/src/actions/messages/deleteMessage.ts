import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMessageOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { deleteMessageExamplePayload } from "../../examplePayloads";
import { deleteMessageInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const deleteMessage = action({
  display: {
    label: "Delete Message",
    description: "Deletes a message by ID.",
  },
  inputs: deleteMessageInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/messages/${params.messageId}`,
    );
    await client.delete(url);
    return {
      data: { success: true, id: params.messageId, message: "Message deleted successfully" },
    };
  },
  examplePerform: async () => deleteMessageExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMessageOutputSchema,
  }),
  examplePayload: deleteMessageExamplePayload,
});
