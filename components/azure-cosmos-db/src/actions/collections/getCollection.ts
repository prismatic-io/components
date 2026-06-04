import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { getCollectionInputs } from "../../inputs";
import { getCollectionExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const getCollection = action({
  display: {
    label: "Get Collection",
    description: "Get a specific collection by ID",
  },
  perform: async (context, { connection, databaseId, collectionId }) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Collections,
      resourceLink,
      debug: context.debug.enabled,
    });
    const response = await client.get(`/${resourceLink}`);
    return {
      data: response.data,
    };
  },
  inputs: getCollectionInputs,
  examplePayload: getCollectionExamplePayload,
});
