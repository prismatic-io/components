import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectDealInputs } from "../inputs";
import type { Deal } from "../types/Deal";
import { getAllPaginatedData } from "../util";

export const selectDeal = dataSource({
  display: {
    label: "Select Deal",
    description: "Select a deal from the list of deals.",
  },
  inputs: selectDealInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const deals = (await getAllPaginatedData<Deal>(
      client,
      "/crm/v3/objects/deals",
      true,
      true,
    )) as Deal[];

    const result = deals.map<Element>((deal) => ({
      label: deal.properties.dealname,
      key: util.types.toString(deal.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
