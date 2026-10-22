import { action, outputSchema } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createFluentClient } from "../../client";
import { createProductExamplePayload } from "../../examplePayloads";
import { createProductInputs } from "../../inputs";
import { createProductOutputSchema } from "../../outputSchemas";
export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new standard product",
  },
  inputs: createProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProductOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createFluentClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      mutation createProduct(
        $productCatalogueRef: String!
        $productRef: String!
        $productType: String!
        $productName: String!
        $productSummary: String!
        $gtin: String!
        $priceCurrency: String!
        $priceValue: Float!
      ) {
        createStandardProduct(
          input: {
            ref: $productRef
            catalogue: { ref: $productCatalogueRef }
            type: $productType
            name: $productName
            summary: $productSummary
            gtin: $gtin
            prices: [
              { currency: $priceCurrency, type: "RRP", value: $priceValue }
            ]
          }
        ) {
          id
          ref
        }
      }
    `;
    const variables = {
      productCatalogueRef: params.productCatalogueRef,
      productRef: params.productRef,
      productType: params.productType,
      productName: params.productName,
      productSummary: params.productSummary,
      gtin: params.gtin,
      priceCurrency: params.priceCurrency,
      priceValue: params.priceValue,
    };
    const data = await client.request(query, variables);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createProductExamplePayload,
  examplePayload: createProductExamplePayload,
});
