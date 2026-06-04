import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const metaGetZen = action({
  display: {
    label: "Meta Get Zen",
    description: "Get the Zen of GitHub",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/zen`);
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
  metaGetZen,
};
