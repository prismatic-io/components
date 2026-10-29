import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealsInputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import type { Deal } from "../../types/deals";
import { getDealsExamplePayload } from "../../examplePayloads";
import { WebhookVersion } from "../../constants";
import { getDealsOutputSchema } from "../../outputSchemas";

export const getDeals = action({
  display: {
    label: "Get Deals",
    description: "Gets all deals.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      filterId,
      stageId,
      status,
      pagination: { limit, cursor } = {},
      sortBy,
      sortDirection,
      fetchAll,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );

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
  inputs: getDealsInputs,
  examplePayload: getDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealsOutputSchema,
  }),
});
