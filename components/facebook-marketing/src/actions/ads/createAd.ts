import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAdResponse } from "../../examplePayloads";
import { createAdInputs } from "../../inputs";
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
      adset_id,
      additionalFields,
      audience_id,
      creative,
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
          ad_schedule_end_time: additionalFields.ad_schedule_end_time,
          ad_schedule_start_time: additionalFields.ad_schedule_start_time,
          adLabels: additionalFields.adLabels,
          adset_spec: additionalFields.adset_spec,
          audience_id,
          conversion_domain: additionalFields.conversion_domain,
          date_format: additionalFields.date_format,
          display_sequence: additionalFields.display_sequence,
          engagement_audience: additionalFields.engagement_audience,
          include_demolink_hashes: additionalFields.include_demolink_hashes,
          priority: additionalFields.priority,
          source_ad_id,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: createAdInputs,
  examplePayload: createAdResponse,
});
