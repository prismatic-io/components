import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, cartId, lineId, connectionInput } from "./../../../inputs";

export const deleteCartLineItem = action({
  display: {
    label: "Delete Cart Line Items",
    description: "Get information about a cart's line items.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
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

export default deleteCartLineItem;
