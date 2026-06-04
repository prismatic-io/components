import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteMetafieldExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteMetafieldInputs as inputs } from "../../../inputsGql";
import type { DeletedMetafield } from "../../interfaces/DeletedMetafield";
import deleteMetafieldQuery from "../queries/metafields/DeleteMetafield.gql";

export const deleteMetafieldGql = action({
  display: {
    label: "Delete Metafield",
    description:
      "Deletes a resource metafield. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  perform: async (context, { shopifyConnection, key, ownerId, namespace }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, "unstable", context.debug.enabled);

    const data: {
      metafieldsDelete: { deletedMetafields: DeletedMetafield[] };
    } = await client.request(deleteMetafieldQuery, {
      metafields: [
        {
          ownerId,
          namespace,
          key,
        },
      ],
    });
    return { data: data.metafieldsDelete };
  },
  examplePayload,
  inputs,
});
