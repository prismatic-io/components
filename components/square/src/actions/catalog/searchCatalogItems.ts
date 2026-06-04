import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchCatalogItemsExamplePayload } from "../../examplePayloads";
import { searchCatalogItemsInputs } from "../../inputs";

export const searchCatalogItems = action({
  display: {
    label: "Search Catalog Items",
    description:
      "Searches for catalog items or item variations by matching supported search attribute values, including custom attribute values, against one or more of the specified query filters.",
  },
  perform: async (
    context,
    {
      squareConnection,
      textFilter,
      categoryIds,
      stockLevels,
      enabledLocationIds,
      cursor,
      limit,
      sortOrder,
      productTypes,
      customAttributeFilters,
    },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      textFilter,
      categoryIds,
      stockLevels,
      enabledLocationIds,
      cursor,
      limit,
      sortOrder,
      productTypes,
      customAttributeFilters,
    };

    const response = await client.post("/v2/catalog/search-catalog-items", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: searchCatalogItemsInputs,
  examplePayload: searchCatalogItemsExamplePayload,
});
