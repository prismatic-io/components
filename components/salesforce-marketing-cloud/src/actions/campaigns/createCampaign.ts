import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { createCampaignInputs } from "../../inputs";

export const createCampaign = action({
  examplePayload: createCampaignExamplePayload,
  display: {
    label: "Create Campaign",
    description: "Create a new campaign in Marketing Cloud.",
  },
  inputs: createCampaignInputs,
  perform: async (
    context,
    {
      connection,
      campaignName,
      campaignDescription,
      campaignCode,
      campaignColor,
      campaignExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name: campaignName,
      description: campaignDescription,
      campaignCode,
      color: campaignColor,
      ...campaignExtraBody,
    };

    const { data } = await client.post(CAMPAIGNS_PATH, body);

    return { data };
  },
});
