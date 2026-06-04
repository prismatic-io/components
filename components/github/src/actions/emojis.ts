import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const emojisGet = action({
  display: {
    label: "Emojis Get",
    description: "Get emojis",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/emojis`);
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
  emojisGet,
};
