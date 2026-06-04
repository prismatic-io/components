import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { setMetafieldExamplePayload as examplePayload } from "../../../examplePayloads";
import { setMetafieldInputs as inputs } from "../../../inputsGql";
import type { Metafield } from "../../interfaces/Metafield";
import type { UserError } from "../../interfaces/UserError";
import setMetafieldQuery from "../queries/metafields/SetMetafield.gql";

export const setMetafieldGql = action({
  display: {
    label: "Set Metafield",
    description:
      "Sets a resource metafield. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  perform: async (context, { shopifyConnection, key, value, ownerId, type, namespace }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, "unstable", context.debug.enabled);

    const data: {
      metafieldsSet: { metafields: Metafield[] } & { userErrors: UserError[] };
    } = await client.request(setMetafieldQuery, {
      metafields: [
        {
          key,
          namespace,
          ownerId,
          type,
          value,
        },
      ],
    });
    return { data: data.metafieldsSet };
  },
  examplePayload,
  inputs,
});
