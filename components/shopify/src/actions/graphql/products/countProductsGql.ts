import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countProductsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countProductsInputs as inputs } from "../../../inputsGql";
import { countProductsGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countProductsQuery from "../queries/products/CountProducts.gql";

export const countProductsGql = action({
  display: {
    label: "Count Products",
    description: "Returns a count of all products.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: { productsCount: Count } =
      await client.request(countProductsQuery);
    return { data: { data: data.productsCount } };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countProductsGqlOutputSchema,
  }),
  examplePayload,
});
