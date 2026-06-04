import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { orderId, storeId, connectionInput } from "./../../../inputs";

export const getOrderInfo = action({
  display: {
    label: "Get Order",
    description: "Get information about a specific order",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/ecommerce/stores/${params.storeId}/orders/${params.orderId}`,
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    orderId: { ...orderId, required: true },
    connection: connectionInput,
  },
});

export default getOrderInfo;
