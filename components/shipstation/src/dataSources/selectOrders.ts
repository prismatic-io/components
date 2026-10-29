import { dataSource, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectOrdersInputs } from "../inputs";
import type { Order } from "../types";

export const selectOrders = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Order",
    description: "A picklist of orders in the ShipStation account.",
  },
  inputs: selectOrdersInputs,
  perform: async (
    _context,
    {
      connectionInput,
      customerName,
      orderStatusList,
      pageFullorders,
      pageSizeFulfillorders,
    },
  ) => {
    const client = createShipStationClient(connectionInput);

    const params = {
      customerName,
      orderStatusList,
      pageFullorders,
      pageSizeFulfillorders,
    };

    const { data } = await client.get("/orders", { params });

    return {
      result: data.orders.map((order: Order) => ({
        key: util.types.toString(order.orderId),
        label: `${order.orderNumber} (ID: ${order.orderId})`,
      })),
    };
  },
});
