import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateOrderExamplePayload } from "../../examplePayloads";
import { updateOrderInputs } from "../../inputs";

export const updateOrder = action({
  display: {
    label: "Update Order",
    description: "Updates an open order by adding, replacing, or deleting fields.",
  },
  perform: async (
    context,
    { orderId, orderObject, fieldsToClear, idempotencyKey, squareConnection },
  ) => {
    
    if (!orderId || !orderObject) {
      throw new Error("`order_id` and `orderObject` are required for updating an order.");
    }

    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      order: orderObject,
      fields_to_clear: fieldsToClear,
    };

    const response = await client.put(`/v2/orders/${orderId}`, requestBody);

    return {
      data: response.data,
    };
  },
  inputs: updateOrderInputs,
  examplePayload: updateOrderExamplePayload,
});
