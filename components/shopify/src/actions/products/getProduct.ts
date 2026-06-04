import { action } from "@prismatic-io/spectral";
import { getProductInputs } from "../../inputs";
import { getProductExamplePayload } from "../../payloadExamples";
import { getProductGql } from "../graphql/products/getProduct";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieves a product by ID.",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const { data } = await getProductGql.perform(context, {
      productId: `gid://shopify/Product/${productId}`,
      shopifyConnection,
    });
    return {
      data,
    };
  },
  inputs: getProductInputs,
  examplePayload: {
    data: getProductExamplePayload,
  },
});
