import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const rateLimitGet = action({
  display: {
    label: "Rate Limit Get",
    description: "Get rate limit status for the authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/rate_limit`);
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
  rateLimitGet,
};
