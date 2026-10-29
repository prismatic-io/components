import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listMailboxesExamplePayload } from "../examplePayloads";
import { listMailboxesInputs } from "../inputs/actions";

export const listMailboxes = action({
  display: {
    label: "List Mailboxes",
    description: "Returns a list of available mailboxes",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const data = await client.list();

      return { data };
    } finally {
      client.close();
    }
  },
  inputs: listMailboxesInputs,
  examplePayload: listMailboxesExamplePayload,
});
