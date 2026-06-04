import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { copyMessageExamplePayload } from "../examplePayloads";
import { copyMessageInputs } from "../inputs/actions";

export const copyMessage = action({
  display: {
    label: "Copy Message",
    description: "Copies a message from one mailbox to another.",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      await client.mailboxOpen(util.types.toString(params.mailbox));
      const data = await client.messageCopy(
        util.types.toString(params.range),
        util.types.toString(params.path),
        { uid: true },
      );
      if (data) {
        
        return { data: { ...data, uidValidity: data.uidValidity?.toString() } };
      } else {
        throw new Error(
          "An error occurred copying the message. Check your message ID and that your destination inbox exists.",
        );
      }
    } finally {
      client.close();
    }
  },
  examplePayload: copyMessageExamplePayload,
  inputs: copyMessageInputs,
});
