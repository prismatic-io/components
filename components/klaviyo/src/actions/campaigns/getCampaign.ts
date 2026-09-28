import { action, outputSchema } from "@prismatic-io/spectral";
import { getCampaignOutputSchema } from "../../outputSchemas";
import { getCampaignInputs as inputs } from "../../inputs";
import { getApi } from "../../api";
import { getCampaignExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsCampaign } from "../../types";
export const getCampaign = action({
  display: {
    label: "Get Campaign",
    description: "Returns a specific campaign based on a required id.",
  },
  performSafety: "safe",
  perform: async (context, { connection, campaignId, fieldsCampaign }) => {
    const campaignsApi = getApi(connection, KlaviyoApi.Campaigns);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, campaignId, fieldsCampaign, debug });
    }
    const { body } = await campaignsApi.getCampaign(campaignId, {
      fieldsCampaign: fieldsCampaign as FieldsCampaign[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getCampaignExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCampaignOutputSchema,
  }),
  examplePayload: getCampaignExamplePayload,
});
