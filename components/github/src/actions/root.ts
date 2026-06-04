import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const metaRoot = action({
  display: {
    label: "Meta Root",
    description: "GitHub API Root",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/`);
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
  metaRoot,
};
