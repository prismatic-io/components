import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { upsertCatalogObjectExamplePayload } from "../../examplePayloads";
import { upsertCatalogObjectInputs } from "../../inputs";

export const upsertCatalogObject = action({
  display: {
    label: "Upsert Catalog Object",
    description: "Creates a new or updates the specified CatalogObject.",
  },
  perform: async (context, { squareConnection, idempotencyKey, catalogObject }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      object: catalogObject,
    };

    const response = await client.post("/v2/catalog/object", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: upsertCatalogObjectInputs,
  examplePayload: upsertCatalogObjectExamplePayload,
});
