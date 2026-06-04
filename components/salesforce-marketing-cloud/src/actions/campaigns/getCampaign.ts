import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { getCampaignExamplePayload } from "../../examplePayloads";
import { getCampaignInputs } from "../../inputs";

export const getCampaign = action({
  examplePayload: getCampaignExamplePayload,
  display: {
    label: "Get Campaign",
    description: "Retrieve a campaign by ID.",
  },
  inputs: getCampaignInputs,
  perform: async (context, { connection, campaignId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${CAMPAIGNS_PATH}/${encodeURIComponent(campaignId)}`,
    );

    return { data };
  },
});
