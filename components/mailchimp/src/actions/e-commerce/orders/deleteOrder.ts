import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { orderId, storeId, connectionInput } from "../../../inputs";

export const deleteOrder = action({
  display: {
    label: "Delete Order",
    description: "Delete an order",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/ecommerce/stores/${params.storeId}/orders/${params.orderId}`,
    );
    return { data };
  },
  inputs: {
    orderId: { ...orderId, required: true },
    storeId: { ...storeId, required: true },
    connection: connectionInput,
  },
});

export default deleteOrder;
