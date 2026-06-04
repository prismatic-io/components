import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { createOrUpdateOrderExamplePayload } from "../../examplePayloads";
import { createOrUpdateOrderInputs } from "../../inputs";

export const createOrUpdateOrder = action({
  display: {
    label: "Create or Update Order",
    description: "Creates a new order or updates an existing one.",
  },
  inputs: createOrUpdateOrderInputs,
  perform: async (
    context,
    {
      orderNumber,
      orderDate,
      orderStatus,
      orderKey,
      billTo,
      shipTo,
      connectionInput,
      additionalFields,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const payload = {
      orderNumber,
      orderDate,
      orderStatus,
      orderKey,
      billTo,
      shipTo,
      ...additionalFields,
    };

    const { data } = await client.post("/orders/createorder", payload);
    return { data };
  },
  examplePayload: createOrUpdateOrderExamplePayload,
});
