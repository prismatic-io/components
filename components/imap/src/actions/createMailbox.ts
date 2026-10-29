import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { createMailboxExamplePayload } from "../examplePayloads";
import { createMailboxInputs } from "../inputs/actions";

export const createMailbox = action({
  display: {
    label: "Create Mailbox",
    description:
      "Creates a new mailbox folder and sets up subscription for the created mailbox",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const data = await client.mailboxCreate(util.types.toString(params.path));
      return { data };
    } finally {
      client.close();
    }
  },
  inputs: createMailboxInputs,
  examplePayload: createMailboxExamplePayload,
});
