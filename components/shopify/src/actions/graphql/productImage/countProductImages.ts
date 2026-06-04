import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countProductImagesExamplePayload as examplePayload } from "../../../examplePayloads";
import { countProductImagesInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countProductImagesQuery from "../queries/productImage/CountProductImages.gql";

export const countProductImagesGql = action({
  display: {
    label: "Count Product Images",
    description: "Returns a count of all product images for the specified product.",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { product: { mediaCount: Count } } = await client.request(countProductImagesQuery, {
      productId,
    });

    return {
      data: data.product.mediaCount,
    };
  },
  inputs,
  examplePayload,
});
