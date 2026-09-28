import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteCampaignOutputSchema } from "../../outputSchemas";
import { deleteCampaignInputs as inputs } from "../../inputs";
import { deleteCampaignExamplePayload } from "../../examplePayloads";
import { getApi } from "../../api";
import { KlaviyoApi } from "../../constants";
export const deleteCampaign = action({
  display: {
    label: "Delete Campaign",
    description: "Delete a campaign with the given campaign ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, campaignId }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, campaignId, debug });
    }
    await campaignsApi.deleteCampaign(campaignId);
    return {
      data: "Campaign deleted successfully.",
    };
  },
  inputs,
  examplePayload: deleteCampaignExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCampaignOutputSchema,
  }),
});
