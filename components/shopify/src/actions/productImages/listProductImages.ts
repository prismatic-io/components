import { action, outputSchema } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import { listProductImagesExamplePayload } from "../../examplePayloads";
import { listProductImagesInputs } from "../../inputs";
import { listProductImagesOutputSchema } from "../../outputSchemas";
import { listProductImagesGql } from "../graphql/productImage/listProductImagesGql";
export const listProductImages = action({
  display: {
    label: "List Product Images",
    description: "Lists all product images for the specified product.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listProductImagesGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      productId: `gid://shopify/Product/${params.productId}`,
      getAlldata: true,
      pagination: {
        limit: MAX_LIMIT,
        endCursor: undefined,
      },
    });
    return { data };
  },
  inputs: listProductImagesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProductImagesOutputSchema,
  }),
  examplePerform: async () => listProductImagesExamplePayload.restMap,
  examplePayload: listProductImagesExamplePayload.restMap,
});
