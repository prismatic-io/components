import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { orderId, storeId, lineId, connectionInput } from "../../../inputs";

export const deleteOrderLineItem = action({
  display: {
    label: "Delete Order Line Item",
    description: "Delete an order Line Item",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/ecommerce/stores/${params.storeId}/orders/${params.orderId}/lines/${params.lineId}`,
    );
    return { data };
  },
  inputs: {
    orderId: { ...orderId, required: true },
    storeId: { ...storeId, required: true },
    lineId: { ...lineId, required: true },
    connection: connectionInput,
  },
});

export default deleteOrderLineItem;
