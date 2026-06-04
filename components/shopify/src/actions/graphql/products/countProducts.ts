import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countProductsExamplePayload as examplePayload } from "../../../examplePayloads";
import { countProductsInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countProductsQuery from "../queries/products/CountProducts.gql";

export const countProductsGql = action({
  display: {
    label: "Count Products",
    description: "Returns a count of all products.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { productsCount: Count } = await client.request(countProductsQuery);
    return { data: { data: data.productsCount } };
  },
  inputs,
  examplePayload,
});
