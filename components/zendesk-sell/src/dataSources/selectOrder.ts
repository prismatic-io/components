import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectOrderInputs } from "../inputs/dataSources/order";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from your Zendesk Sell account.",
  },
  inputs: selectOrderInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/orders", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((order: any) => {
          return {
            key: order.data.id.toString(),
            label: order.data.name || `Order ${order.data.id}`,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Order", key: "12345" }],
  },
});
