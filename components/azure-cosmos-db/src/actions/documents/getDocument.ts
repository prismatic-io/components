import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { getDocumentInputs } from "../../inputs";
import { getDocumentExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const getDocument = action({
  display: {
    label: "Get Document",
    description: "Get a specific document by ID",
  },
  perform: async (
    context,
    { connection, databaseId, collectionId, documentId, partitionKey },
  ) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}/docs/${documentId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.GET,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: context.debug.enabled,
    });
    const headers: Record<string, string> = {};
    if (partitionKey) {
      headers["x-ms-documentdb-partitionkey"] = `["${partitionKey}"]`;
    }

    const { data } = await client.get(`/${resourceLink}`, { headers });

    return {
      data,
    };
  },
  inputs: getDocumentInputs,
  examplePayload: getDocumentExamplePayload,
});
