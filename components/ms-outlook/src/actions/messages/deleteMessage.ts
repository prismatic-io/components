import { action } from "@prismatic-io/spectral";
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
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/messages/${params.messageId}`,
    );
    const { data } = await client.delete(url);
    return { data };
  },
  examplePayload: deleteMessageExamplePayload,
});
