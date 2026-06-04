import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { updateDocumentInputs } from "../../inputs";
import { updateDocumentExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const updateDocument = action({
  display: {
    label: "Update Document",
    description: "Update an existing document in a collection",
  },
  perform: async (
    context,
    {
      connection,
      databaseId,
      collectionId,
      documentId,
      document,
      partitionKey,
      etag,
    },
  ) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}/docs/${documentId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.PUT,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: context.debug.enabled,
    });

    const partKey = partitionKey;
    const etagValue = etag;

    const headers: Record<string, string> = {};
    if (partKey) {
      headers["x-ms-documentdb-partitionkey"] = `["${partKey}"]`;
    }

    if (etagValue) {
      headers["If-Match"] = etagValue;
    }

    const { data } = await client.put(`/${resourceLink}`, document, {
      headers,
    });
    return {
      data,
    };
  },
  inputs: updateDocumentInputs,
  examplePayload: updateDocumentExamplePayload,
});
