import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { createOrUpdateMultipleOrdersExamplePayload } from "../../examplePayloads";
import { createOrUpdateMultipleOrdersInputs } from "../../inputs";

export const createOrUpdateMultipleOrders = action({
  display: {
    label: "Create or Update Multiple Orders",
    description: "Creates or updates multiple orders in one request.",
  },
  perform: async (context, { ordersArray, connectionInput }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );
    const payload = ordersArray;

    const { data } = await client.post("/orders/createorders", payload);
    return { data };
  },
  inputs: createOrUpdateMultipleOrdersInputs,
  examplePayload: createOrUpdateMultipleOrdersExamplePayload,
});
