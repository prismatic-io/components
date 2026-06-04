import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  paginationLimitInput,
  pipelineIdInput,
  sortBy,
  sortDirection,
} from "../../inputs";
import { cleanNumber } from "../../util";
import { WebhookVersion } from "../../constants";

export const getPipelineDeals = action({
  display: {
    label: "Get Pipeline Deals",
    description: "Gets deals in a pipeline.",
  },
  perform: async (
    context,
    { connection, id, filterId, stageId, limit, cursor, sortBy, sortDirection },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals", {
      params: {
        filter_id: filterId,
        stage_id: stageId,
        limit,
        pipeline_id: id,
        cursor,
        sort_by: sortBy,
        sort_direction: sortDirection,
      },
    });
    return { data };
  },
  inputs: {
    id: pipelineIdInput,
    filterId: input({
      label: "Filter ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals matching the given filter will be returned",
    }),
    stageId: input({
      label: "Stage ID",
      type: "string",
      clean: cleanNumber,
      comments: "If supplied, only deals within the given stage will be returned",
    }),
    limit: paginationLimitInput,
    cursor,
    sortBy,
    sortDirection: {
      ...sortDirection,
      default: "desc",
    },
    connection: connectionInput,
  },
});
