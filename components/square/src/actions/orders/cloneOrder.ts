import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { cloneOrderExamplePayload } from "../../examplePayloads";
import { cloneOrderInputs } from "../../inputs";

export const cloneOrder = action({
  display: {
    label: "Clone Order",
    description: "Creates a new order, in the DRAFT state, by duplicating an existing order.",
  },
  perform: async (context, { squareConnection, orderId, idempotencyKey }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const version = getVersionFromConnection(squareConnection);

    const requestBody = {
      order_id: orderId,
      version,
      idempotency_key: idempotencyKey,
    };

    const response = await client.post("/v2/orders/clone", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: cloneOrderInputs,
  examplePayload: cloneOrderExamplePayload,
});
