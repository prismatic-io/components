import { action, outputSchema } from "@prismatic-io/spectral";
import { createCampaignOutputSchema } from "../../outputSchemas";
import { createCampaignInputs as inputs } from "../../inputs";
import { getApi } from "../../api";
import {
  type CampaignCreateQuery,
  CampaignEnum,
  type CampaignMessageCreateQueryResourceObject,
  type SendStrategySubObject,
} from "klaviyo-api";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createCampaign = action({
  display: {
    label: "Create Campaign",
    description:
      "Creates a campaign given a set of parameters, then returns it.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      campaignName,
      campaignMessages,
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
        campaignName,
        campaignMessages,
        includedAudiences,
        excludedAudiences,
        campaignConfig,
        debug,
      });
    }
    const campaign: CampaignCreateQuery = {
      data: {
        type: CampaignEnum.Campaign,
        attributes: {
          name: campaignName,
          sendStrategy: campaignConfig.sendStrategy as SendStrategySubObject,
          sendOptions: campaignConfig.sendOptions,
          trackingOptions: campaignConfig.trackingOptions,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCampaignOutputSchema,
  }),
  examplePayload: createCampaignExamplePayload,
});
