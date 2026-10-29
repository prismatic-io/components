import { action, outputSchema } from "@prismatic-io/spectral";
import { createCampaignOutputSchema } from "../../outputSchemas";
import { createCampaignInputs as inputs } from "../../inputs";
import { getApi } from "../../api";
import {
  toCampaignMessages,
  toSendStrategy,
  toTrackingOptions,
} from "../../util";
import { type CampaignCreateQuery, CampaignEnum } from "klaviyo-api";
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
          sendStrategy: toSendStrategy(campaignConfig.sendStrategy),
          sendOptions: campaignConfig.sendOptions,
          trackingOptions: toTrackingOptions(campaignConfig.trackingOptions),
          campaignMessages: {
            data: toCampaignMessages(campaignMessages) ?? [],
          },
          audiences: {
            included: includedAudiences ?? [],
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
  examplePerform: async () => createCampaignExamplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCampaignOutputSchema,
  }),
  examplePayload: createCampaignExamplePayload,
});
