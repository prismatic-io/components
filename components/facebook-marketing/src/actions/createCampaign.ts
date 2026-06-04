import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  adAccountId,
  adLabels,
  bid_strategy,
  buying_type,
  campaignName,
  campaign_optimization_type,
  daily_budget,
  is_skadnetwork_attribution,
  is_using_l3_schedule,
  iterative_split_test_configs,
  lifetime_budget,
  myConnectionField,
  objective,
  promoted_object,
  source_campaign_id,
  special_ad_categories,
  special_ad_category_country,
  spend_cap,
  start_time,
  status,
  stop_time,
  topline_id,
  version,
} from "../inputs";

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
      adLabels,
      bid_strategy,
      buying_type,
      campaign_optimization_type,
      daily_budget,
      is_skadnetwork_attribution,
      is_using_l3_schedule,
      iterative_split_test_configs,
      lifetime_budget,
      campaignName,
      objective,
      promoted_object,
      source_campaign_id,
      spend_cap,
      start_time,
      status,
      stop_time,
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
          adLabels,
          bid_strategy,
          buying_type,
          campaign_optimization_type,
          daily_budget,
          is_skadnetwork_attribution,
          is_using_l3_schedule,
          iterative_split_test_configs,
          lifetime_budget,
          name: campaignName,
          objective,
          promoted_object,
          source_campaign_id,
          spend_cap,
          start_time,
          status,
          stop_time,
          topline_id,
        },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adAccountId,
    campaignName,
    objective,
    status: {
      ...status,
      required: true,
      comments:
        "Only ACTIVE and PAUSED are valid during creation. Other statuses can be used for update. If it is set to PAUSED, its active child objects will be paused and have an effective status CAMPAIGN_PAUSED.",
    },
    special_ad_categories,
    special_ad_category_country,
    adLabels,
    bid_strategy,
    buying_type,
    campaign_optimization_type,
    daily_budget,
    is_skadnetwork_attribution,
    is_using_l3_schedule,
    iterative_split_test_configs,
    lifetime_budget,
    promoted_object,
    source_campaign_id,
    spend_cap,
    start_time,

    stop_time,
    topline_id,
    version,
  },
});
