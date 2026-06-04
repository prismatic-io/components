import { dataSource } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectFulfillmentsInputs } from "../inputs";
import type { Fulfillment } from "../types/index";

export const selectFulfillments = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Fulfillment",
    description: "A picklist of fulfillments in the ShipStation account.",
  },
  inputs: selectFulfillmentsInputs,
  perform: async (_context, { connectionInput }) => {
    const client = createShipStationClient(connectionInput);

    const { data } = await client.get("/fulfillments", {
      params: { page: 1, pageSize: 500 },
    });
    const fulfillments = data.fulfillments || data;

    return {
      result: (fulfillments as Fulfillment[])
        .map((fulfillment) => ({
          key: fulfillment.fulfillmentId.toString(),
          label: `Fulfillment #${fulfillment.fulfillmentId} (Order: ${fulfillment.orderNumber})`,
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "Fulfillment #12345 (Order: ORD-001)",
        key: "12345",
      },
    ],
  },
});
