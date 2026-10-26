import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteProductExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteProductInputs as inputs } from "../../../inputsGql";
import { deleteProductGqlOutputSchema } from "../../../outputSchemas";
import deleteProductQuery from "../queries/products/DeleteProduct.gql";
export const deleteProductGql = action({
  display: {
    label: "Delete Product",
    description: "Deletes an existing product.",
  },
  performSafety: "notAllowed",
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      productDelete: Record<string, unknown>;
    } = await client.request(deleteProductQuery, {
      input: {
        id: productId,
      },
    });
    return {
      data: data.productDelete,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
