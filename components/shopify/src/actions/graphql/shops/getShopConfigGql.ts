import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getShopConfigExamplePayload } from "../../../examplePayloads";
import { getShopConfigInputs as inputs } from "../../../inputsGql";
import { getShopConfigGqlOutputSchema } from "../../../outputSchemas";
import type { Shop } from "../../../types";
import { shopMapper } from "../mappers/shopMapper";
import getShopConfigQuery from "../queries/shops/GetShopConfig.gql";
export const getShopConfigGql = action({
  display: {
    label: "Get Shop Configuration",
    description: "Retrieves the shop configuration.",
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
      shop: Shop;
    } = await client.request(getShopConfigQuery);
    return {
      data: { data: { shop: shopMapper(data.shop) } },
    };
  },
  examplePayload: getShopConfigExamplePayload.restMap,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getShopConfigGqlOutputSchema,
  }),
});
