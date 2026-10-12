import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getStageDealsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getStageDealsExamplePayload } from "../../examplePayloads";
import { getStageDealsOutputSchema } from "../../outputSchemas";
export const getStageDeals = action({
  display: {
    label: "Get Stage Deals",
    description: "Gets deals in a stage.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      filterId,
      pagination: { limit, cursor } = {},
      sortBy,
      sortDirection,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
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
  inputs: getStageDealsInputs,
  examplePayload: getStageDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getStageDealsOutputSchema,
  }),
});
