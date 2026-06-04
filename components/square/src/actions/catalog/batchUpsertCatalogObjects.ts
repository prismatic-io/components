import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchUpsertCatalogObjectsExamplePayload } from "../../examplePayloads";
import { batchUpsertCatalogObjectsInputs } from "../../inputs";

export const batchUpsertCatalogObjects = action({
  display: {
    label: "Batch Upsert Catalog Objects",
    description:
      "Creates or updates up to 10,000 target objects based on the provided list of objects.",
  },
  perform: async (context, { squareConnection, idempotencyKey, batches }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      idempotency_key: idempotencyKey,
      batches: batches,
    };

    const response = await client.post("/v2/catalog/batch-upsert", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: batchUpsertCatalogObjectsInputs,
  examplePayload: batchUpsertCatalogObjectsExamplePayload,
});
