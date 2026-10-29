import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteVariantInputs as inputs } from "../../../inputsGql";
import { deleteVariantGqlOutputSchema } from "../../../outputSchemas";
import deleteVariantQuery from "../queries/variants/DeleteVariant.gql";

export const deleteVariantGql = action({
  display: {
    label: "Delete Variant",
    description: "Deletes an existing variant by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { productId, variantId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
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
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteVariantGqlOutputSchema,
  }),
});
