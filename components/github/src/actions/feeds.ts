import { action, Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const activityGetFeeds = action({
  display: {
    label: "Activity Get Feeds",
    description: "Get feeds",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/feeds`);
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
  activityGetFeeds,
};
