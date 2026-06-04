import { action } from "@prismatic-io/spectral";
import { getCampaignInputs as inputs } from "../../inputs/campaigns";
import { getApi } from "../../api";
import type { FieldsCampaign } from "../../types/FieldsCampaign";
import { getCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getCampaign = action({
  display: {
    label: "Get Campaign",
    description: "Returns a specific campaign based on a required id.",
  },
  perform: async (context, { connection, campaignId, fieldsCampaign }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, campaignId, fieldsCampaign, debug });
    }

    const { body } = await campaignsApi.getCampaign(campaignId!, {
      fieldsCampaign: fieldsCampaign as FieldsCampaign[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getCampaignExamplePayload,
});
