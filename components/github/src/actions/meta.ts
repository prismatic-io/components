import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const metaGet = action({
  display: {
    label: "Meta Get",
    description: "Get GitHub meta information",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/meta`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

export default {
  metaGet,
};
