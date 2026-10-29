import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { createDocumentInputs } from "../../inputs";
import { createDocumentExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const createDocument = action({
  display: {
    label: "Create Document",
    description: "Create a new document in a collection",
  },
  perform: async (
    context,
    { connection, databaseId, collectionId, document, partitionKey },
  ) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.POST,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: context.debug.enabled,
    });

    const headers: Record<string, string> = {};
    if (partitionKey) {
      headers["x-ms-documentdb-partitionkey"] = `["${partitionKey}"]`;
    }

    const { data } = await client.post(`/${resourceLink}/docs`, document, {
      headers,
    });
    return {
      data,
    };
  },
  inputs: createDocumentInputs,
  examplePayload: createDocumentExamplePayload,
});
