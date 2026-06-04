import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { getProductImageInputs } from "../../inputs";
import { getProductImagesExamplePayload } from "../../payloadExamples";

export const getProductImage = action({
  display: {
    label: "Get Product Image (Deprecated)",
    description:
      "Get the information and metadata of a product image connected to your platform. This version of the action is being deprecated. Please replace action with Get Product Image.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const { headers, data } = await client.get(
      `/products/${params.productId}/images/${params.imageId}.json`,
    );

    return {
      data: { data, headers },
    };
  },
  inputs: getProductImageInputs,
  examplePayload: {
    data: getProductImagesExamplePayload,
  },
});
