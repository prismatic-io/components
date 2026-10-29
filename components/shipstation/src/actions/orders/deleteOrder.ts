import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { deleteOrderExamplePayload } from "../../examplePayloads";
import { deleteOrderInputs } from "../../inputs";

export const deleteOrder = action({
  display: {
    label: "Delete Order",
    description:
      "Deletes an order from the database by setting it to inactive.",
  },
  perform: async (context, { orderId, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.delete(`/orders/${orderId}`);
    return { data };
  },
  inputs: deleteOrderInputs,
  examplePayload: deleteOrderExamplePayload,
});
