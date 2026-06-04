import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { deleteDocumentInputs } from "../../inputs";
import { deleteDocumentExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const deleteDocument = action({
  display: {
    label: "Delete Document",
    description: "Delete a document from a collection",
  },
  perform: async (
    context,
    { connection, databaseId, collectionId, documentId, partitionKey, etag },
  ) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}/docs/${documentId}`;
    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.DELETE,
      resourceType: CosmosDbResourceType.Documents,
      resourceLink,
      debug: context.debug.enabled,
    });

    const headers: Record<string, string> = {};
    if (partitionKey) {
      headers["x-ms-documentdb-partitionkey"] = `["${partitionKey}"]`;
    }

    if (etag) {
      headers["If-Match"] = etag;
    }

    await client.delete(`/${resourceLink}`, { headers });
    return {
      data: {
        success: true,
        message: `Document ${documentId} deleted successfully`,
      },
    };
  },
  inputs: deleteDocumentInputs,
  examplePayload: deleteDocumentExamplePayload,
});
