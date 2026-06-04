import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteProductImageInputs } from "../../inputs";
import { deleteProductImageExamplePayload } from "../../payloadExamples";

export const deleteProductImage = action({
  display: {
    label: "Delete Product Image (Deprecated)",
    description:
      "Delete the information and metadata of a product image connected to your platform. This version of the action is being deprecated. Please replace action with Delete Product Image.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.delete(
      `/products/${params.productId}/images/${params.imageId}.json`,
    );

    return {
      data: { data, headers },
    };
  },
  inputs: deleteProductImageInputs,
  examplePayload: {
    data: deleteProductImageExamplePayload,
  },
});
