import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listProductImagesExamplePayload } from "../../../examplePayloads";
import { listProductImagesInputs as inputs } from "../../../inputsGql";
import { listProductImagesGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo, ProductImage } from "../../../types";
import { fetchData, getNumericId } from "../../../util";
import { productImageMapper } from "../mappers/productImageMapper";
import listProductImagesQuery from "../queries/productImage/ListProductImages.gql";

export const listProductImagesGql = action({
  display: {
    label: "List Product Images",
    description: "Lists all product images for the specified product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, productId, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const { images } = (await fetchData<ProductImage>(
      client,
      ["product", "media"],
      "images",
      getAlldata,
      listProductImagesQuery,
      {
        productId,
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProductImagesGqlOutputSchema,
  }),
  examplePerform: async () => listProductImagesExamplePayload.restMap,
  examplePayload: listProductImagesExamplePayload.restMap,
});
