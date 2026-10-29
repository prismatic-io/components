import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { setMetafieldExamplePayload as examplePayload } from "../../../examplePayloads";
import { setMetafieldInputs as inputs } from "../../../inputsGql";
import { setMetafieldGqlOutputSchema } from "../../../outputSchemas";
import type { Metafield, UserError } from "../../../types";
import setMetafieldQuery from "../queries/metafields/SetMetafield.gql";

export const setMetafieldGql = action({
  display: {
    label: "Set Metafield",
    description:
      "Sets a resource metafield. Note: This action currently utilizes an unstable version of the Shopify Admin GraphQL API and is subject to change.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, key, value, ownerId, type, namespace },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      "unstable",
      context.debug.enabled,
      context.logger,
    );

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
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: setMetafieldGqlOutputSchema,
  }),
});
