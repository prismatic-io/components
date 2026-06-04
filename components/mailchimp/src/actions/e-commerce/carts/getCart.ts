import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, cartId, connectionInput } from "./../../../inputs";

export const getCart = action({
  display: {
    label: "Get Cart",
    description: "Get information about a specific cart",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
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

export default getCart;
