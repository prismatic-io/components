import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { deleteCampaignExamplePayload } from "../../examplePayloads";
import { deleteCampaignInputs } from "../../inputs";

export const deleteCampaign = action({
  examplePayload: deleteCampaignExamplePayload,
  display: {
    label: "Delete Campaign",
    description: "Delete a campaign by ID.",
  },
  inputs: deleteCampaignInputs,
  perform: async (context, { connection, campaignId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.delete(`${CAMPAIGNS_PATH}/${campaignId}`);

    return { data };
  },
});
