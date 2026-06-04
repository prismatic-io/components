import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveCatalogObjectExamplePayload } from "../../examplePayloads";
import { retrieveCatalogObjectInputs } from "../../inputs";

export const retrieveCatalogObject = action({
  display: {
    label: "Retrieve Catalog Object",
    description: "Returns a single CatalogObject based on the provided ID.",
  },
  perform: async (
    context,
    { squareConnection, objectId, includeRelatedObjects, catalogVersion },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestQuery: Record<string, unknown> = {
      include_related_objects: includeRelatedObjects,
    };

    if (catalogVersion) {
      requestQuery.catalog_version = catalogVersion;
    }

    const response = await client.get(`/v2/catalog/object/${objectId}`, {
      params: requestQuery,
    });

    return {
      data: response.data,
    };
  },
  inputs: retrieveCatalogObjectInputs,
  examplePayload: retrieveCatalogObjectExamplePayload,
});
