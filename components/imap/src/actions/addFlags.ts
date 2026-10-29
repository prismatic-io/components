import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { addFlagsExamplePayload } from "../examplePayloads";
import { addFlagsInputs } from "../inputs/actions";

export const addFlags = action({
  display: {
    label: "Add Flags",
    description: "Add new flags to an existing message",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      await client.mailboxOpen(util.types.toString(params.mailbox));
      const data = await client.messageFlagsAdd(
        util.types.toString(params.range),
        params.flags.map((flag) => util.types.toString(flag)),
        { uid: true },
      );
      return { data };
    } finally {
      client.close();
    }
  },
  inputs: addFlagsInputs,
  examplePayload: addFlagsExamplePayload,
});
