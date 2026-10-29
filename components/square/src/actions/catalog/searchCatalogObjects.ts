import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchCatalogObjectsExamplePayload } from "../../examplePayloads";
import { searchCatalogObjectsInputs } from "../../inputs";

export const searchCatalogObjects = action({
  display: {
    label: "Search Catalog Objects",
    description:
      "Searches for catalog objects of any type by matching supported search attribute values, excluding custom attribute values on items or item variations, against one or more of the specified query filters.",
  },
  perform: async (
    context,
    {
      squareConnection,
      pagination = {},
      objectTypes,
      includeDeletedObjects,
      includeRelatedObjects,
      beginTime,
      catalogQuery,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const requestBody = {
      cursor: pagination.cursor,
      object_types: objectTypes,
      include_deleted_objects: includeDeletedObjects,
      include_related_objects: includeRelatedObjects,
      begin_time: beginTime,
      query: catalogQuery,
      limit: pagination.limit,
    };

    const response = await client.post("/v2/catalog/search", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: searchCatalogObjectsInputs,
  examplePayload: searchCatalogObjectsExamplePayload,
});
