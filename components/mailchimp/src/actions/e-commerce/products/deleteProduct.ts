import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { productId, storeId, connectionInput } from "./../../../inputs";

export const deleteProducts = action({
  display: {
    label: "Delete Product",
    description: "Delete a product from a store",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      `/ecommerce/stores/${params.storeId}/products/${params.productId}`,
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    productId,
    connection: connectionInput,
  },
});

export default deleteProducts;
