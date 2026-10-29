import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { createVariantExamplePayload as examplePayload } from "../../../examplePayloads";
import { createVariantInputs as inputs } from "../../../inputsGql";
import { createVariantGqlOutputSchema } from "../../../outputSchemas";
import createVariantQuery from "../queries/variants/CreateVariant.gql";

export const createVariantGql = action({
  display: {
    label: "Create Variant",
    description: "Creates a new variant for the specified product.",
  },
  performSafety: "notAllowed",
  perform: async (context, { productId, variant, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const data: {
      productVariantsBulkCreate: Record<string, unknown>;
    } = await client.request(createVariantQuery, {
      productId,
      variants: [variant],
    });

    return {
      data: data.productVariantsBulkCreate,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createVariantGqlOutputSchema,
  }),
});
