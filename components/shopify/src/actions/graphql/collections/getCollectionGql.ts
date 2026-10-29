import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getCollectionExamplePayload as examplePayload } from "../../../examplePayloads";
import { getCollectionInputs as inputs } from "../../../inputsGql";
import { getCollectionGqlOutputSchema } from "../../../outputSchemas";
import type { Collection } from "../../../types";
import getCollectionQuery from "../queries/collections/GetCollection.gql";

export const getCollectionGql = action({
  display: {
    label: "Get Collection",
    description: "Retrieves a collection by ID.",
  },
  performSafety: "safe",
  perform: async (context, { collectionId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: { collection: Collection } = await client.request(
      getCollectionQuery,
      {
        id: collectionId,
      },
    );

    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCollectionGqlOutputSchema,
  }),
  examplePayload,
});
