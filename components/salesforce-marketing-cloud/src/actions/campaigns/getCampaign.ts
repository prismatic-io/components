import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CAMPAIGNS_PATH } from "../../constants";
import { getCampaignExamplePayload } from "../../examplePayloads";
import { getCampaignInputs } from "../../inputs";
import { campaignOutputSchema } from "../../outputSchemas";
export const getCampaign = action({
  examplePayload: getCampaignExamplePayload,
  display: {
    label: "Get Campaign",
    description: "Retrieve a campaign by ID.",
  },
  inputs: getCampaignInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: campaignOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, campaignId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${CAMPAIGNS_PATH}/${encodeURIComponent(campaignId)}`,
    );
    return { data };
  },
});
