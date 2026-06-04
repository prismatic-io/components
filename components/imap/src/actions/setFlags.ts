import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { setFlagsExamplePayload } from "../examplePayloads";
import { setFlagsInputs } from "../inputs/actions";

export const setFlags = action({
  display: {
    label: "Set Flags",
    description: "Set a value for an existing message flag",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const data = await client.messageFlagsSet(
        util.types.toString(params.range),
        params.flags.map((flag) => util.types.toString(flag)),
        { uid: true },
      );

      return {
        data,
      };
    } finally {
      client.close();
    }
  },
  inputs: setFlagsInputs,
  examplePayload: setFlagsExamplePayload,
});
