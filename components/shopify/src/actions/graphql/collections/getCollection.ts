import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { getCollectionExamplePayload as examplePayload } from "../../../examplePayloads";
import { getCollectionInputs as inputs } from "../../../inputsGql";
import type { Collection } from "../../interfaces/Collection";
import getCollectionQuery from "../queries/collections/GetCollection.gql";

export const getCollectionGql = action({
  display: {
    label: "Get Collection",
    description: "Retrieves a collection by ID.",
  },
  perform: async (context, { collectionId, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    const data: { collection: Collection } = await client.request(getCollectionQuery, {
      id: collectionId,
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
