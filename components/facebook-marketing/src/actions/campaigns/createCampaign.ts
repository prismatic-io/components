import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCampaignResponse } from "../../examplePayloads";
import { createCampaignInputs } from "../../inputs";
export const createCampaign = action({
  display: {
    label: "Create Campaign",
    description: "Creates a new campaign.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adAccountId,
      special_ad_categories,
      special_ad_category_country,
      additionalFields,
      campaignName,
      objective,
      source_campaign_id,
      status,
      topline_id,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.post(
      `/${adAccountId}/campaigns`,
      {},
      {
        params: {
          special_ad_categories: JSON.stringify(special_ad_categories || []),
          special_ad_category_country: special_ad_category_country
            ? JSON.stringify(special_ad_category_country)
            : undefined,
          adLabels: additionalFields.adLabels,
          bid_strategy: additionalFields.bid_strategy,
          buying_type: additionalFields.buying_type,
          campaign_optimization_type:
            additionalFields.campaign_optimization_type,
          daily_budget: additionalFields.daily_budget,
          is_skadnetwork_attribution:
            additionalFields.is_skadnetwork_attribution,
          is_using_l3_schedule: additionalFields.is_using_l3_schedule,
          iterative_split_test_configs:
            additionalFields.iterative_split_test_configs,
          lifetime_budget: additionalFields.lifetime_budget,
          name: campaignName,
          objective,
          promoted_object: additionalFields.promoted_object,
          source_campaign_id,
          spend_cap: additionalFields.spend_cap,
          start_time: additionalFields.start_time,
          status,
          stop_time: additionalFields.stop_time,
          topline_id,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: createCampaignInputs,
  examplePayload: createCampaignResponse,
});
