import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adAccountId, myConnectionField, version } from "../inputs";
import type { Ad } from "../types/Ad";
import { getPaginatedData } from "../util";

export const selectAdsInAccount = dataSource({
  display: {
    label: "Select Ads in Account",
    description: "Select an ad in the provided ad account.",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(client, `/${params.adAccountId}/ads`, true, {
      fields: "name,id",
    });

    const result: Element[] = data.map((ad: Ad) => ({
      label: `${ad.name} - (${ad.id})`,
      key: ad.id,
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
