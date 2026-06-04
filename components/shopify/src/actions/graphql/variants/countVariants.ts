import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countVariantsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countVariantsInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countVariantsQuery from "../queries/variants/CountVariants.gql";

export const countVariantsGql = action({
  display: {
    label: "Count Variants",
    description: "Returns a count of all product variants.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: {
      productVariantsCount: Count;
    } = await client.request(countVariantsQuery);

    return {
      data: data.productVariantsCount,
    };
  },
  examplePayload,
  inputs,
});
