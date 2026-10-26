import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countProductImagesExamplePayload as examplePayload } from "../../../examplePayloads";
import { countProductImagesInputs as inputs } from "../../../inputsGql";
import { countProductImagesGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countProductImagesQuery from "../queries/productImage/CountProductImages.gql";
export const countProductImagesGql = action({
  display: {
    label: "Count Product Images",
    description:
      "Returns a count of all product images for the specified product.",
  },
  performSafety: "safe",
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      product: {
        mediaCount: Count;
      };
    } = await client.request(countProductImagesQuery, {
      productId,
    });
    return {
      data: data.product.mediaCount,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countProductImagesGqlOutputSchema,
  }),
  examplePayload,
});
