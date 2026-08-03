import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectAdsInAccountInputs } from "../inputs";
import type { Ad } from "../types";
import { getPaginatedData } from "../util";
export const selectAdsInAccount = dataSource({
  display: {
    label: "Select Ads in Account",
    description: "Select an ad in the provided ad account.",
  },
  perform: async (_context, params) => {
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
  inputs: selectAdsInAccountInputs,
});
