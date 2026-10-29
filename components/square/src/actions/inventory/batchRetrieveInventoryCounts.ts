import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchRetrieveInventoryCountsExamplePayload } from "../../examplePayloads";
import { batchRetrieveInventoryCountsInputs } from "../../inputs";

export const batchRetrieveInventoryCounts = action({
  display: {
    label: "Batch Retrieve Inventory Counts",
    description:
      "Returns current inventory counts for the provided catalog objects at the requested locations.",
  },
  perform: async (
    context,
    {
      squareConnection,
      catalogObjectIds,
      locationIds,
      updatedAfter,
      pagination = {},
      states,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const requestBody = {
      catalog_object_ids: catalogObjectIds,
      location_ids: locationIds,
      updated_after: updatedAfter,
      cursor: pagination.cursor,
      states: states,
      limit: pagination.limit,
    };

    const response = await client.post(
      "/v2/inventory/counts/batch-retrieve",
      requestBody,
    );

    return {
      data: response.data,
    };
  },
  inputs: batchRetrieveInventoryCountsInputs,
  examplePayload: batchRetrieveInventoryCountsExamplePayload,
});
