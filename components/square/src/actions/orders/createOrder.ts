import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createOrderExamplePayload } from "../../examplePayloads";
import { createOrderInputs } from "../../inputs";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Creates a new order.",
  },
  perform: async (context, { locationId, orderObject, squareConnection }) => {
    
    if (!locationId || !orderObject) {
      throw new Error("`location_id` and `orderObject` are required for an order.");
    }

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: orderObject.idempotencyKey,
      order: orderObject,
    };

    const response = await client.post(`/v2/locations/${locationId}/orders`, requestBody);

    return {
      data: response.data,
    };
  },
  inputs: createOrderInputs,
  examplePayload: createOrderExamplePayload,
});
