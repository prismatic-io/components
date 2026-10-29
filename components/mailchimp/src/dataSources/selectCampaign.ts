import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { MailchimpCampaign } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectCampaign = dataSource({
  display: {
    label: "Select Campaign",
    description: "Select a Mailchimp campaign",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpCampaign>({
      client,
      endpoint: "/campaigns",
      dataKey: "campaigns",
      fetchAll: true,
    });

    const campaigns = data.campaigns as MailchimpCampaign[];
    const result = campaigns.map<Element>((campaign) => ({
      label: campaign.settings.title || campaign.id,
      key: campaign.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});

export default selectCampaign;
