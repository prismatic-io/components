import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { searchMailboxExamplePayload } from "../examplePayloads";
import { searchMailboxInputs } from "../inputs/actions";
import type { SearchObject } from "imapflow";

export const searchMailbox = action({
  display: {
    label: "Search / List Mailbox Messages",
    description: "Returns all messages in the given mailbox",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    await client.connect();
    try {
      await client.getMailboxLock(util.types.toString(params.mailbox));

      const options: SearchObject = {
        from: util.types.toString(params.from) || undefined,
        to: util.types.toString(params.to) || undefined,
        ...params.filterOptions,
      };

      if (params.readUnread === "unread") {
        options.seen = false;
      }
      if (params.readUnread === "read") {
        options.seen = true;
      }
      if (params.readUnread === "all") {
        options.all = true;
      }

      const data = await client.search(options, { uid: true });

      return { data };
    } finally {
      client.close();
    }
  },
  inputs: searchMailboxInputs,
  examplePayload: searchMailboxExamplePayload,
});
