import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getStatusExamplePayload } from "../examplePayloads";
import { getStatusInputs } from "../inputs/actions";

export const getStatus = action({
  display: {
    label: "Get Mailbox Status",
    description: "Returns the status of a mailbox's properties",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      const status = await client.status(util.types.toString(params.mailbox), {
        unseen: true,
        messages: true,
        highestModseq: true,
        recent: true,
        uidNext: true,
        uidValidity: true,
      });
      return {
        data: JSON.parse(
          JSON.stringify(status, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        ),
      };
    } finally {
      client.close();
    }
  },
  inputs: getStatusInputs,
  examplePayload: getStatusExamplePayload,
});
