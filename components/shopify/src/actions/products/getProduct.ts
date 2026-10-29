import { action, outputSchema } from "@prismatic-io/spectral";
import { getProductExamplePayload } from "../../examplePayloads";
import { getProductInputs } from "../../inputs";
import { getProductOutputSchema } from "../../outputSchemas";
import { getProductGql } from "../graphql/products/getProductGql";

export const getProduct = action({
  display: {
    label: "Get Product",
    description: "Retrieves a product by ID.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductOutputSchema,
  }),
  examplePayload: getProductExamplePayload.restMap,
});
