import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const metaGetOctocat = action({
  display: {
    label: "Meta Get Octocat",
    description: "Get Octocat",
  },
  perform: async (context, { connection, s }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/octocat`, { params: { s } });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    s: {
      label: "S",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The words to show in Octocat"s speech bubble',
    },
  },
});

export default {
  metaGetOctocat,
};
