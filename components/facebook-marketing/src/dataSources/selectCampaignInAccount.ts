import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adAccountId, myConnectionField, version } from "../inputs";
import type { Campaign } from "../types/Campaign";
import { getPaginatedData } from "../util";

export const selectCampaignInAccount = dataSource({
  display: {
    label: "Select Campaign in Account",
    description: "Select a campaign in the provided ad account.",
  },
  perform: async (context, params) => {
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
  inputs: {
    adAccountId: {
      ...adAccountId,
      dataSource: undefined,
    },
    connection: myConnectionField,
    version,
  },
});
