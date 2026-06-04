import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listCatalogExamplePayload } from "../../examplePayloads";
import { listCatalogInputs } from "../../inputs";

export const listCatalog = action({
  display: {
    label: "List Catalog",
    description: "Returns a list of all CatalogObjects of the specified types in the catalog.",
  },
  perform: async (context, { squareConnection, cursor, types, catalogVersion }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const queryParameters = {
      cursor: cursor,
      types: types,
      catalog_version: catalogVersion,
    };

    const response = await client.get("/v2/catalog/list", {
      params: queryParameters,
    });

    return {
      data: response.data,
    };
  },
  inputs: listCatalogInputs,
  examplePayload: listCatalogExamplePayload,
});
