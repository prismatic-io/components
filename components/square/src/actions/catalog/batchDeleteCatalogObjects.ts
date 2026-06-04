import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchDeleteCatalogObjectsExamplePayload } from "../../examplePayloads";
import { batchDeleteCatalogObjectsInputs } from "../../inputs";

export const batchDeleteCatalogObjects = action({
  display: {
    label: "Batch Delete Catalog Objects",
    description:
      "Deletes a set of CatalogItems based on the provided list of target IDs and returns a set of successfully deleted IDs in the response.",
  },
  perform: async (context, { squareConnection, objectIds }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      object_ids: objectIds,
    };

    const response = await client.post("/v2/catalog/batch-delete", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: batchDeleteCatalogObjectsInputs,
  examplePayload: batchDeleteCatalogObjectsExamplePayload,
});
