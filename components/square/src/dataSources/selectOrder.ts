import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectOrderInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Lists orders in the Square account.",
  },
  inputs: selectOrderInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allOrders = await fetchAllPages(client, "/v2/orders/search", "orders", {
      method: "POST",
      additionalParams: { limit: 100 },
    });

    const result = (allOrders.orders as Record<string, unknown>[])
      .map((order: Record<string, unknown>) => ({
        label: (order.reference_id as string) || (order.id as string),
        key: order.id as string,
      }))
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
