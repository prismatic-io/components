import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteProductExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteProductInputs as inputs } from "../../../inputsGql";
import deleteProductQuery from "../queries/products/DeleteProduct.gql";

export const deleteProductGql = action({
  display: {
    label: "Delete Product",
    description: "Deletes an existing product.",
  },
  perform: async (context, { productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: { productDelete: Record<string, unknown> } = await client.request(
      deleteProductQuery,
      {
        input: {
          id: productId,
        },
      },
    );

    return {
      data: data.productDelete,
    };
  },
  inputs,
  examplePayload,
});
