import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealsTimelineInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealsTimelineExamplePayload } from "../../examplePayloads";
import { getDealsTimelineOutputSchema } from "../../outputSchemas";

export const getDealsTimeline = action({
  display: {
    label: "Get Deals Timeline",
    description: "Gets the deals timeline.",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      connection,
      startDate,
      interval,
      amount,
      fieldKey,
      userId,
      pipelineId,
      filterId,
      excludeDeals,
      totalsConvertCurrency,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get("/deals/timeline", {
      params: {
        start_date: startDate,
        interval,
        amount,
        field_key: fieldKey,
        user_id: userId,
        pipeline_id: pipelineId,
        filter_id: filterId,
        exclude_deals: excludeDeals,
        totals_convert_currency: totalsConvertCurrency,
      },
    });
    return { data };
  },
  inputs: getDealsTimelineInputs,
  examplePayload: getDealsTimelineExamplePayload,
  examplePerform: async () => getDealsTimelineExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealsTimelineOutputSchema,
  }),
});
