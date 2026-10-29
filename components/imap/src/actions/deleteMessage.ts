import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { deleteMessageExamplePayload } from "../examplePayloads";
import { deleteMessageInputs } from "../inputs/actions";

export const deleteMessage = action({
  display: {
    label: "Delete Message",
    description: "Delete an existing message",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      await client.mailboxOpen(util.types.toString(params.mailbox));
      const data = await client.messageDelete(
        util.types.toString(params.messageIndex),
        { uid: true },
      );
      return { data };
    } finally {
      client.close();
    }
  },
  inputs: deleteMessageInputs,
  examplePayload: deleteMessageExamplePayload,
});
