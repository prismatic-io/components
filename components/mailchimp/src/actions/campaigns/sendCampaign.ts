import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { campaignId, connectionInput } from "../../inputs";

export const sendCampaign = action({
  display: {
    label: "Send Campaign",
    description:
      "Send a Mailchimp campaign. For RSS Campaigns, the campaign will send according to its schedule. All other campaigns will send immediately.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/campaigns/${params.campaignId}/actions/send`,
    );
    return { data };
  },
  inputs: {
    campaignId: { ...campaignId, required: true },
    connection: connectionInput,
  },
});

export default sendCampaign;
