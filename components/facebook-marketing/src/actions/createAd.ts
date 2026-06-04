import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  adAccountId,
  adLabels,
  ad_schedule_end_time,
  ad_schedule_start_time,
  adset_id,
  adset_spec,
  audience_id,
  conversion_domain,
  creative,
  date_format,
  display_sequence,
  engagement_audience,
  include_demolink_hashes,
  myConnectionField,
  name,
  priority,
  source_ad_id,
  status,
  version,
} from "../inputs";

export const createAd = action({
  display: {
    label: "Create Ad",
    description: "Creates a new ad.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adAccountId,
      name,
      ad_schedule_end_time,
      ad_schedule_start_time,
      adLabels,
      adset_id,
      adset_spec,
      audience_id,
      conversion_domain,
      creative,
      date_format,
      display_sequence,
      engagement_audience,
      include_demolink_hashes,
      priority,
      source_ad_id,
      status,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.post(
      `/${adAccountId}/ads`,
      {},
      {
        params: {
          name,
          creative,
          adset_id,
          status,
          ad_schedule_end_time,
          ad_schedule_start_time,
          adLabels,
          adset_spec,
          audience_id,
          conversion_domain,
          date_format,
          display_sequence,
          engagement_audience,
          include_demolink_hashes,
          priority,
          source_ad_id,
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
    name: { ...name, comments: "Name of the ad.", required: true },
    creative,
    adset_id,
    status: { ...status, required: true },
    adset_spec,
    ad_schedule_end_time,
    ad_schedule_start_time,
    adLabels: { ...adLabels, comments: "Ad labels associated with this ad." },
    audience_id,
    conversion_domain,
    date_format,
    display_sequence,
    engagement_audience,
    include_demolink_hashes,
    priority,
    source_ad_id,
    version,
  },
});
