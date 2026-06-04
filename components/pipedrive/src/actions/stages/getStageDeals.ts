import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  paginationLimitInput,
  sortBy,
  sortDirection,
  stageIdInput,
} from "../../inputs";
import { cleanNumber } from "../../util";
import { WebhookVersion } from "../../constants";

export const getStageDeals = action({
  display: {
    label: "Get Stage Deals",
    description: "Gets deals in a stage.",
  },
  perform: async (context, { connection, id, filterId, limit, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals", {
      params: {
        filter_id: filterId,
        limit,
        sort_by: sortBy,
        sort_direction: sortDirection,
        stage_id: id,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: stageIdInput,
    filterId: input({
      label: "Filter ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals matching the given filter will be returned",
    }),
    limit: paginationLimitInput,
    cursor,
    sortBy,
    sortDirection,
  },
});
