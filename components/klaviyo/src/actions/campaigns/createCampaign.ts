import { action } from "@prismatic-io/spectral";
import { createCampaignInputs as inputs } from "../../inputs/campaigns";
import { getApi } from "../../api";
import {
  type CampaignCreateQuery,
  CampaignEnum,
  type CampaignMessageCreateQueryResourceObject,
  type SendStrategySubObject,
} from "klaviyo-api";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const createCampaign = action({
  display: {
    label: "Create Campaign",
    description:
      "Creates a campaign given a set of parameters, then returns it.",
  },
  perform: async (
    context,
    {
      connection,
      campaignName,
      campaignMessages,
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
        campaignName,
        campaignMessages,
        includedAudiences,
        excludedAudiences,
        trackingOptions,
        sendOptions,
        sendStrategy,
        debug,
      });
    }

    const campaign: CampaignCreateQuery = {
      data: {
        type: CampaignEnum.Campaign,
        attributes: {
          name: campaignName!,
          sendStrategy: sendStrategy as SendStrategySubObject,
          sendOptions,
          trackingOptions,
          campaignMessages: {
            data: campaignMessages as CampaignMessageCreateQueryResourceObject[],
          },
          audiences: {
            included: includedAudiences,
            excluded: excludedAudiences,
          },
        },
      },
    };
    const { body } = await campaignsApi.createCampaign(campaign);
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: createCampaignExamplePayload,
});
