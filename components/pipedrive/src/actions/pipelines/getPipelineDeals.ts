import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPipelineDealsInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPipelineDealsExamplePayload } from "../../examplePayloads";
import { getPipelineDealsOutputSchema } from "../../outputSchemas";
export const getPipelineDeals = action({
  display: {
    label: "Get Pipeline Deals",
    description: "Gets deals in a pipeline.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      filterId,
      stageId,
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
  inputs: getPipelineDealsInputs,
  examplePayload: getPipelineDealsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineDealsOutputSchema,
  }),
});
