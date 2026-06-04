import { action } from "@prismatic-io/spectral";
import { deleteCampaignInputs as inputs } from "../../inputs/campaigns";
import { getApi } from "../../api";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const deleteCampaign = action({
  display: {
    label: "Delete Campaign",
    description: "Delete a campaign with the given campaign ID.",
  },
  perform: async (context, { connection, campaignId }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, campaignId, debug });
    }
    await campaignsApi.deleteCampaign(campaignId!);
    return {
      data: "Campaign deleted successfully.",
    };
  },
  inputs,
});
