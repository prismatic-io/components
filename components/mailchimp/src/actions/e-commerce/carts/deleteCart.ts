import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, cartId, connectionInput } from "../../../inputs";

export const deleteCart = action({
  display: {
    label: "Delete Cart",
    description: "Delete a specific cart",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/ecommerce/stores/${params.storeId}/carts/${params.cartId}`,
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    cartId,
    connection: connectionInput,
  },
});

export default deleteCart;
