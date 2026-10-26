import { dataSource, type Element, util } from "@prismatic-io/spectral";
import listProductImagesDataSourceQuery from "../actions/graphql/queries/productImage/ListProductImagesDataSource.gql";
import { getShopifyGraphQlClient } from "../client";
import { MAX_LIMIT } from "../constants";
import { selectProductImagesInputs } from "../inputs";
import type { ProductImageNode } from "../types";
import { fetchData, getNumericId } from "../util";
export const listProductImages = dataSource({
  display: {
    label: "Select Product Image",
    description:
      "Selects a product image from a list of images for the specified product.",
  },
  inputs: selectProductImagesInputs,
  perform: async (context, { shopifyConnection, productId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      false,
      context.logger,
    );
    const cleanedProductId = productId.startsWith("gid://")
      ? productId
      : `gid://shopify/Product/${productId}`;
    const { images } = (await fetchData<ProductImageNode>(
      client,
      ["product", "media"],
      "images",
      true,
      listProductImagesDataSourceQuery,
      {
        productId: cleanedProductId,
        first: MAX_LIMIT,
      },
    )) as unknown as Record<"images", ProductImageNode[]>;
    const result = images
      .map<Element>((image, index) => {
        const numericId = getNumericId(image.id);
        return {
          label: image.alt || `Image ${index + 1}`,
          key: util.types.toString(numericId),
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
});
