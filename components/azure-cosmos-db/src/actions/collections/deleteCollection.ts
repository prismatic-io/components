import { action } from "@prismatic-io/spectral";
import { createCosmosDbClient } from "../../client";
import { deleteCollectionInputs } from "../../inputs";
import { deleteCollectionExamplePayload } from "../../examplePayloads";
import { CosmosDbResourceType, HttpVerb } from "../../constants";

export const deleteCollection = action({
  display: {
    label: "Delete Collection",
    description: "Delete a collection from a database",
  },
  perform: async (context, { connection, databaseId, collectionId }) => {
    const resourceLink = `dbs/${databaseId}/colls/${collectionId}`;

    const client = createCosmosDbClient({
      connection,
      verb: HttpVerb.DELETE,
      resourceType: CosmosDbResourceType.Collections,
      resourceLink,
      debug: context.debug.enabled,
    });
    await client.delete(`/${resourceLink}`);
    return {
      data: {
        success: true,
        message: `Collection ${collectionId} deleted successfully`,
      },
    };
  },
  inputs: deleteCollectionInputs,
  examplePayload: deleteCollectionExamplePayload,
});
