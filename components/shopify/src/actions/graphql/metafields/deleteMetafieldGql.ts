import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteMetafieldExamplePayload as examplePayload } from "../../../examplePayloads";
import { deleteMetafieldInputs as inputs } from "../../../inputsGql";
import { deleteMetafieldGqlOutputSchema } from "../../../outputSchemas";
import type { DeletedMetafield } from "../../../types";
import deleteMetafieldQuery from "../queries/metafields/DeleteMetafield.gql";

export const deleteMetafieldGql = action({
  display: {
    label: "Delete Metafield",
    description:
      "Deletes a resource metafield. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection, key, ownerId, namespace }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      "unstable",
      context.debug.enabled,
      context.logger,
    );

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
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMetafieldGqlOutputSchema,
  }),
});
