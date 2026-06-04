import { action } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import { listProductImagesExamplePayload } from "../../examplePayloads";
import { listProductImagesInputs } from "../../inputs";
import { listProductImagesGql } from "../graphql/productImage/listProductImages";

export const listProductImages = action({
  display: {
    label: "List Product Images",
    description: "Lists all product images for the specified product.",
  },
  perform: async (context, params) => {
    const { data } = await listProductImagesGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      productId: `gid://shopify/Product/${params.productId}`,
      getAlldata: true,
      limit: MAX_LIMIT,
      endCursor: undefined,
    });
    return { data };
  },
  inputs: listProductImagesInputs,
  examplePayload: listProductImagesExamplePayload.restMap,
});
