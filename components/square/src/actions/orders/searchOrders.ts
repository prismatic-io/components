import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchOrdersExamplePayload } from "../../examplePayloads";
import { searchOrdersInputs } from "../../inputs";

export const searchOrders = action({
  display: {
    label: "Search Orders",
    description: "Searches all orders for one or more locations.",
  },
  perform: async (
    context,
    {
      squareConnection,
      locationIds,
      orderQuery,
      pagination = {},
      returnEntries,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const requestBody = {
      location_ids: locationIds,
      query: orderQuery,
      limit: pagination.limit || 500,
      return_entries: returnEntries || false,
      cursor: pagination.cursor,
    };

    const response = await client.post("/v2/orders/search", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: searchOrdersInputs,
  examplePayload: searchOrdersExamplePayload,
});
