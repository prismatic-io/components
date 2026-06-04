import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteCatalogObjectExamplePayload } from "../../examplePayloads";
import { deleteCatalogObjectInputs } from "../../inputs";

export const deleteCatalogObject = action({
  display: {
    label: "Delete Catalog Object",
    description:
      "Deletes a single CatalogObject based on the provided ID and returns the set of successfully deleted IDs in the response.",
  },
  perform: async (context, { squareConnection, objectId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.delete(`/v2/catalog/object/${objectId}`);

    return {
      data: response.data,
    };
  },
  inputs: deleteCatalogObjectInputs,
  examplePayload: deleteCatalogObjectExamplePayload,
});
