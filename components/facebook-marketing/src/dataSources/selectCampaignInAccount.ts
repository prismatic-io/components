import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCampaignInAccountInputs } from "../inputs";
import type { Campaign } from "../types";
import { getPaginatedData } from "../util";
export const selectCampaignInAccount = dataSource({
  display: {
    label: "Select Campaign in Account",
    description: "Select a campaign in the provided ad account.",
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(
      client,
      `/${params.adAccountId}/campaigns`,
      true,
      {
        fields: "name,id",
      },
    );
    const result: Element[] = data.map((campaign: Campaign) => ({
      label: `${campaign.name} - (${campaign.id})`,
      key: campaign.id,
    }));
    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: selectCampaignInAccountInputs,
});
