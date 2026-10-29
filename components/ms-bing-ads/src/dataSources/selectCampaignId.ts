import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { selectCampaignIdExamplePayload } from "../examplePayloads";
import { selectCampaignIdInputs } from "../inputs/campaigns";
import { getRestClient } from "../restClient";
import type { Campaign, QueryRestResponse } from "../types";

export const selectCampaignId = dataSource({
  display: {
    label: "Select Campaign ID",
    description: "Gets the campaigns that belong to the specified account.",
  },
  perform: async (_context, { connection, accountId, customerId }) => {
    const client = getRestClient({ connection, accountId, customerId });

    const { data: response } = await client.post<QueryRestResponse>(
      "/Campaigns/QueryByAccountId",
      { AccountId: accountId },
    );

    const campaigns = (response?.Campaigns as Campaign[] | undefined) ?? [];

    const result = campaigns
      .sort((a, b) =>
        util.types.toString(a.Name) < util.types.toString(b.Name) ? -1 : 1,
      )
      .map<Element>((campaign) => ({
        key: util.types.toString(campaign.Id),
        label: `${campaign.Name} (id: ${campaign.Id})`,
      }));

    return { result };
  },
  inputs: selectCampaignIdInputs,
  dataSourceType: "picklist",
  examplePayload: selectCampaignIdExamplePayload,
});
