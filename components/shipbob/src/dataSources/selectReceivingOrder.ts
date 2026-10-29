import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface ReceivingOrder {
  id: number;
  purchase_order_number: string;
  status: string;
}

export const selectReceivingOrder = dataSource({
  display: {
    label: "Select Receiving Order",
    description:
      "Select a warehouse receiving order from your ShipBob account.",
  },
  inputs: {
    connection: connectionInput,
    version: { ...version, default: "2.0" },
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<ReceivingOrder[]>("/receiving", {
      params: {
        Limit: 250,
      },
    });
    return {
      result: data
        .map<Element>((order) => ({
          label:
            order.purchase_order_number || `WRO ${order.id} (${order.status})`,
          key: order.id.toString(),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "PO-12345", key: "100" },
      { label: "WRO 200 (Processing)", key: "200" },
    ],
  },
});
