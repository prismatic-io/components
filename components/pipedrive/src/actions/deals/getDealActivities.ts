import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  dealIdInput,
  paginationLimitInput,
  sortBy,
  sortDirection,
} from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getDealActivities = action({
  display: {
    label: "Get Deal Activities",
    description: "Lists activities associated with a deal.",
  },
  perform: async (context, { connection, id, limit, done, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/activities", {
      params: { limit, done, deal_id: id, sort_by: sortBy, sort_direction: sortDirection, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    limit: paginationLimitInput,
    cursor,
    done: input({
      label: "Done",
      type: "boolean",
      comments: "Whether the activity is done or not",
      clean: util.types.toBool,
    }),
    sortBy: sortBy,
    sortDirection: sortDirection,
  },
});
