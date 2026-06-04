import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectDealInputs } from "../inputs/dataSources/deal";

export const selectDeal = dataSource({
  display: {
    label: "Select Deal",
    description: "Select a deal from your Zendesk Sell account.",
  },
  inputs: selectDealInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/deals", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((deal: any) => {
          return {
            key: deal.data.id.toString(),
            label: deal.data.name,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Deal", key: "12345" }],
  },
});
