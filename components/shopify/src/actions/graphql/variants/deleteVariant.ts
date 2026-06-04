import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteVariantInputs as inputs } from "../../../inputsGql";
import deleteVariantQuery from "../queries/variants/DeleteVariant.gql";

export const deleteVariantGql = action({
  display: {
    label: "Delete Variant",
    description: "Deletes an existing variant by ID.",
  },
  perform: async (context, { productId, variantId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: {
      productVariantsBulkDelete: Record<string, unknown>;
    } = await client.request(deleteVariantQuery, {
      productId,
      variantsIds: [variantId],
    });

    return {
      data: data.productVariantsBulkDelete,
    };
  },
  examplePayload,
  inputs,
});
