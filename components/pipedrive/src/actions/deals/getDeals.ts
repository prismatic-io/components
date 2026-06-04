import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  dealStatus,
  fetchAll,
  filterId,
  paginationLimitInput,
  sortBy,
  sortDirection,
  stageId,
} from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import type { Deal } from "../../types/deals";
import { getDealsExamplePayload } from "../../examplePayloads/deals";
import { WebhookVersion } from "../../constants";

export const getDeals = action({
  display: {
    label: "Get Deals",
    description: "Gets all deals.",
  },
  perform: async (
    context,
    { connection, filterId, stageId, status, limit, sortBy, sortDirection, fetchAll, cursor },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);

    const data = await paginateRecordsWithCursor<Deal>(
      client,
      "deals",
      {
        filter_id: filterId,
        stage_id: stageId,
        status,
        limit,
        sort_by: sortBy,
        sort_direction: sortDirection,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: {
    fetchAll,
    limit: paginationLimitInput,
    cursor,
    sortBy: sortBy,
    sortDirection: sortDirection,
    filterId,
    stageId,
    status: dealStatus,
    connection: connectionInput,
  },
  examplePayload: {
    data: getDealsExamplePayload,
  },
});
