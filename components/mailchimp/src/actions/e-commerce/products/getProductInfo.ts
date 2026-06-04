import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { productId, storeId, connectionInput } from "./../../../inputs";

export const getProductInfo = action({
  display: {
    label: "Get Product",
    description: "Get information about a specific product",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
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

export default getProductInfo;
