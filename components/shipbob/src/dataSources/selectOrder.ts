import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Order {
  id: number;
  order_number: string;
  reference_id: string;
}

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from your ShipBob account.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Order[]>("/order", {
      params: {
        Limit: 250,
        SortOrder: "Newest",
      },
    });
    return {
      result: data
        .map<Element>((order) => ({
          label:
            order.order_number || order.reference_id || `Order ${order.id}`,
          key: order.id.toString(),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "ORD-001", key: "12345" },
      { label: "ORD-002", key: "67890" },
    ],
  },
});
