import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { removeFlagsExamplePayload } from "../examplePayloads";
import { removeFlagsInputs } from "../inputs/actions";

export const removeFlags = action({
  display: {
    label: "Remove Flags From Message",
    description: "Remove existing flags from an existing message",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      await client.mailboxOpen(util.types.toString(params.mailbox));

      const data = await client.messageFlagsRemove(
        util.types.toString(params.range),
        params.flags.map((flag) => util.types.toString(flag)),
        { uid: true },
      );

      return { data };
    } finally {
      client.close();
    }
  },
  inputs: removeFlagsInputs,
  examplePayload: removeFlagsExamplePayload,
});
