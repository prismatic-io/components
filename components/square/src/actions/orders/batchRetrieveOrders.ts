import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { batchRetrieveOrdersExamplePayload } from "../../examplePayloads";
import { batchRetrieveOrdersInputs } from "../../inputs";

export const batchRetrieveOrders = action({
  display: {
    label: "Batch Retrieve Orders",
    description: "Retrieves a set of orders by their IDs.",
  },
  perform: async (context, { squareConnection, locationId, orderIds }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      locationId,
      orderIds,
    };

    const response = await client.post("/v2/orders/batch-retrieve", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: batchRetrieveOrdersInputs,
  examplePayload: batchRetrieveOrdersExamplePayload,
});
