import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const activityListPublicEvents = action({
  display: {
    label: "Activity List Public Events",
    description: "List public events",
  },
  perform: async (context, { connection, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/events`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

export default {
  activityListPublicEvents,
};
