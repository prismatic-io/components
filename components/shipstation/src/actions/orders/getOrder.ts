import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { getOrderExamplePayload } from "../../examplePayloads";
import { getOrderInputs } from "../../inputs";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Retrieves a single order from the database.",
  },
  perform: async (context, { orderId, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/orders/${orderId}`);
    return { data };
  },
  inputs: getOrderInputs,
  examplePayload: getOrderExamplePayload,
});
