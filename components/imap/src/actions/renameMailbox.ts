import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { renameMailboxExamplePayload } from "../examplePayloads";
import { renameMailboxInputs } from "../inputs/actions";

export const renameMailbox = action({
  display: {
    label: "Rename Mailbox",
    description: "Change the name of an existing mailbox",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const data = await client.mailboxRename(
        util.types.toString(params.path),
        util.types.toString(params.newPath),
      );
      return { data };
    } finally {
      client.close();
    }
  },
  inputs: renameMailboxInputs,
  examplePayload: renameMailboxExamplePayload,
});
