import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getShopConfigExamplePayload } from "../../../examplePayloads";
import { getShopConfigInputs as inputs } from "../../../inputsGql";
import type { Shop } from "../../interfaces/Shop";
import { shopMapper } from "../mappers/shopMapper";
import getShopConfigQuery from "../queries/shops/GetShopConfig.gql";

export const getShopConfigGql = action({
  display: {
    label: "Get Shop Configuration",
    description: "Retrieves the shop configuration.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { shop: Shop } = await client.request(getShopConfigQuery);

    return {
      data: { data: { shop: shopMapper(data.shop) } },
    };
  },
  examplePayload: getShopConfigExamplePayload.restMap,
  inputs,
});
