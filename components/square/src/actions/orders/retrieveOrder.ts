import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveOrderExamplePayload } from "../../examplePayloads";
import { retrieveOrderInputs } from "../../inputs";

export const retrieveOrder = action({
  display: {
    label: "Retrieve Order",
    description: "Retrieves an Order by its ID.",
  },
  perform: async (context, { squareConnection, orderId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/orders/${orderId}`);

    return {
      data: response.data,
    };
  },
  inputs: retrieveOrderInputs,
  examplePayload: retrieveOrderExamplePayload,
});
