import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listProductImagesExamplePayload } from "../../../examplePayloads";
import { listProductImagesInputs as inputs } from "../../../inputsGql";
import { fetchData, getNumericId } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import type { ProductImage } from "../../interfaces/ProductImage";
import { productImageMapper } from "../mappers/productImageMapper";
import listProductImagesQuery from "../queries/productImage/ListProductImages.gql";

export const listProductImagesGql = action({
  display: {
    label: "List Product Images",
    description: "Lists all product images for the specified product.",
  },
  perform: async (context, { shopifyConnection, productId, getAlldata, limit, endCursor }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const { images } = (await fetchData<ProductImage>(
      client,
      ["product", "media"],
      "images",
      getAlldata,
      listProductImagesQuery,
      {
        productId,
        first: getAlldata ? MAX_LIMIT : limit,
        cursor: getAlldata ? undefined : endCursor,
      },
    )) as Record<"images", ProductImage[]> & { pageInfo: PageInfo };

    return {
      data: {
        data: {
          images: images.map((image, index) =>
            productImageMapper(image, getNumericId(productId), index),
          ),
        },
      },
    };
  },
  inputs,
  examplePayload: listProductImagesExamplePayload.restMap,
});
