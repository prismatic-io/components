import { action, outputSchema } from "@prismatic-io/spectral";
import { updateCampaignOutputSchema } from "../../outputSchemas";
import { updateCampaignInputs as inputs } from "../../inputs";
import { getApi } from "../../api";
import {
  CampaignEnum,
  type CampaignPartialUpdateQuery,
  type SendStrategySubObject,
} from "klaviyo-api";
import { updateCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateCampaign = action({
  display: {
    label: "Update Campaign",
    description: "Update a campaign with the given campaign ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      campaignId,
      campaignName,
      includedAudiences,
      excludedAudiences,
      campaignConfig,
    },
  ) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        campaignId,
        campaignName,
        includedAudiences,
        excludedAudiences,
        campaignConfig,
        debug,
      });
    }
    const campaign: CampaignPartialUpdateQuery = {
      data: {
        type: CampaignEnum.Campaign,
        attributes: {
          name: campaignName,
          sendStrategy: campaignConfig.sendStrategy as SendStrategySubObject,
          sendOptions: campaignConfig.sendOptions,
          trackingOptions: campaignConfig.trackingOptions,
          audiences: {
            included: includedAudiences,
            excluded: excludedAudiences,
          },
        },
        id: campaignId,
      },
    };
    const { body } = await campaignsApi.updateCampaign(campaignId, campaign);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCampaignOutputSchema,
  }),
  examplePayload: updateCampaignExamplePayload,
});
