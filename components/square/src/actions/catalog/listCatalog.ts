import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listCatalogExamplePayload } from "../../examplePayloads";
import { listCatalogInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listCatalog = action({
  display: {
    label: "List Catalog",
    description:
      "Returns a list of all catalog objects of the specified types in the catalog.",
  },
  perform: async (
    context,
    { squareConnection, fetchAll, cursor, types, catalogVersion },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/catalog/list",
      "objects",
      {
        initialCursor: cursor,
        additionalParams: {
          types: types,
          catalog_version: catalogVersion,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listCatalogInputs,
  examplePayload: listCatalogExamplePayload,
});
