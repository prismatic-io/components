import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, cartId, lineId, connectionInput } from "./../../../inputs";

export const getCartLineItem = action({
  display: {
    label: "Get Cart Line Item",
    description: "Get information about a cart's specific line item",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/ecommerce/stores/${params.storeId}/carts/${params.cartId}/lines/${params.lineId}`,
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    cartId,
    lineId,
    connection: connectionInput,
  },
});

export default getCartLineItem;
