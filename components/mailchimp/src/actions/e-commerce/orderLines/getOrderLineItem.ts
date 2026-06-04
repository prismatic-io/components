import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { orderId, storeId, lineId, connectionInput } from "../../../inputs";

export const getOrderLineItem = action({
  display: {
    label: "Get Order Line Item",
    description: "Get an order Line Item",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/ecommerce/stores/${params.storeId}/orders/${params.orderId}/lines/${params.lineId}`,
    );
    return { data };
  },
  inputs: {
    orderId: { ...orderId, required: true },
    storeId: { ...storeId, required: true },
    lineId,
    connection: connectionInput,
  },
});

export default getOrderLineItem;
