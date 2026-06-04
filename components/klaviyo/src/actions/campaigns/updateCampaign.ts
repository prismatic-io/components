import { action } from "@prismatic-io/spectral";
import { updateCampaignInputs as inputs } from "../../inputs/campaigns";
import { getApi } from "../../api";
import {
  CampaignEnum,
  type CampaignPartialUpdateQuery,
  type SendStrategySubObject,
} from "klaviyo-api";
import { updateCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const updateCampaign = action({
  display: {
    label: "Update Campaign",
    description: "Update a campaign with the given campaign ID.",
  },
  perform: async (
    context,
    {
      connection,
      campaignId,
      campaignName,
      includedAudiences,
      excludedAudiences,
      trackingOptions,
      sendOptions,
      sendStrategy,
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
        trackingOptions,
        sendOptions,
        sendStrategy,
        debug,
      });
    }
    const campaign: CampaignPartialUpdateQuery = {
      data: {
        type: CampaignEnum.Campaign,
        attributes: {
          name: campaignName,
          sendStrategy: sendStrategy as SendStrategySubObject,
          sendOptions,
          trackingOptions,
          audiences: {
            included: includedAudiences,
            excluded: excludedAudiences,
          },
        },
        id: campaignId!,
      },
    };
    const { body } = await campaignsApi.updateCampaign(campaignId!, campaign);
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: updateCampaignExamplePayload,
});
