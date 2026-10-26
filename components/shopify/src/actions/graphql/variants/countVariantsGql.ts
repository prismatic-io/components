import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countVariantsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countVariantsInputs as inputs } from "../../../inputsGql";
import { countVariantsGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countVariantsQuery from "../queries/variants/CountVariants.gql";
export const countVariantsGql = action({
  display: {
    label: "Count Variants",
    description: "Returns a count of all product variants.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      productVariantsCount: Count;
    } = await client.request(countVariantsQuery);
    return {
      data: data.productVariantsCount,
    };
  },
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countVariantsGqlOutputSchema,
  }),
});
