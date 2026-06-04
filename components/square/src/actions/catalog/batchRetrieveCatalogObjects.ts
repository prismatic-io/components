import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchRetrieveCatalogObjectsExamplePayload } from "../../examplePayloads";
import { batchRetrieveCatalogObjectsInputs } from "../../inputs";

export const batchRetrieveCatalogObjects = action({
  display: {
    label: "Batch Retrieve Catalog Objects",
    description: "Returns a set of objects based on the provided ID.",
  },
  perform: async (
    context,
    { squareConnection, objectIds, includeRelatedObjects, catalogVersion, includeDeletedObjects },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      object_ids: objectIds,
      include_related_objects: includeRelatedObjects,
      catalog_version: catalogVersion,
      include_deleted_objects: includeDeletedObjects,
    };

    const response = await client.post("/v2/catalog/batch-retrieve", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: batchRetrieveCatalogObjectsInputs,
  examplePayload: batchRetrieveCatalogObjectsExamplePayload,
});
