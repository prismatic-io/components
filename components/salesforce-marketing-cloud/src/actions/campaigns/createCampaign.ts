import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { createCampaignInputs } from "../../inputs";
import { campaignOutputSchema } from "../../outputSchemas";
export const createCampaign = action({
  examplePayload: createCampaignExamplePayload,
  display: {
    label: "Create Campaign",
    description: "Create a new campaign in Marketing Cloud.",
  },
  inputs: createCampaignInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: campaignOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, campaignName, additionalFields }) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      name: campaignName,
      description: additionalFields.campaignDescription,
      campaignCode: additionalFields.campaignCode,
      color: additionalFields.campaignColor,
      ...additionalFields.campaignExtraBody,
    };
    const { data } = await client.post(CAMPAIGNS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { campaignName, additionalFields },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createCampaignExamplePayload.data,
      name: campaignName,
      description:
        additionalFields.campaignDescription ??
        createCampaignExamplePayload.data.description,
      campaignCode:
        additionalFields.campaignCode ??
        createCampaignExamplePayload.data.campaignCode,
      color:
        additionalFields.campaignColor ??
        createCampaignExamplePayload.data.color,
    },
  }),
});
