import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { createCollectionInputs } from "../../inputs";
import { createCollectionExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";
import type { Collection } from "../../interfaces/Collection";

export const createCollection = action({
  display: {
    label: "Create Collection",
    description: "Create a new collection in a database",
  },
  perform: async (
    context,
    { connection, databaseId, collectionId, partitionKey, throughput },
  ) => {
    const resourceLink = `dbs/${databaseId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.POST,
      resourceType: CosmosDbResourceType.Collections,
      resourceLink,
      debug: context.debug.enabled,
    });

    const body: Collection = {
      id: collectionId,
    };

    if (partitionKey) {
      body.partitionKey = {
        paths: [partitionKey],
        kind: "Hash",
      };
    }

    const headers: Record<string, string> = {};
    if (throughput) {
      headers["x-ms-offer-throughput"] = throughput;
    }

    const { data } = await client.post(`/${resourceLink}/colls`, body, {
      headers,
    });
    return {
      data,
    };
  },
  inputs: createCollectionInputs,
  examplePayload: createCollectionExamplePayload,
});
