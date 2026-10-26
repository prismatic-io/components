import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteProductImageExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteProductImageInputs as inputs } from "../../../inputsGql";
import { deleteProductImageGqlOutputSchema } from "../../../outputSchemas";
import deleteProductImageQuery from "../queries/productImage/DeleteProductImage.gql";
export const deleteProductImageGql = action({
  display: {
    label: "Delete Product Image",
    description: "Deletes a product image.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, productId, imageId }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      productDeleteMedia: Record<string, unknown>;
    } = await client.request(deleteProductImageQuery, {
      productId,
      mediaIds: [imageId],
    });
    return {
      data: data.productDeleteMedia,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteProductImageGqlOutputSchema,
  }),
  examplePerform: async () => examplePayload,
  examplePayload,
});
