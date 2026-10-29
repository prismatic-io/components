import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { updateVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { updateVariantInputs as inputs } from "../../../inputsGql";
import { updateVariantGqlOutputSchema } from "../../../outputSchemas";
import updateVariantQuery from "../queries/variants/UpdateVariant.gql";

export const updateVariantGql = action({
  display: {
    label: "Update Variant",
    description: "Updates an existing product variant by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { updateVariant, productId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: {
      productVariantsBulkUpdate: Record<string, unknown>;
    } = await client.request(updateVariantQuery, {
      productId,
      variants: [updateVariant],
    });
    return {
      data: data.productVariantsBulkUpdate,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateVariantGqlOutputSchema,
  }),
});
