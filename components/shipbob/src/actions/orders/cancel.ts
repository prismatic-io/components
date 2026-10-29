import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelOrderExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  orderId,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const cancelOrder = action({
  display: {
    label: "Cancel Order",
    description: "Cancel an existing Order by Order ID",
  },
  perform: async (
    context,
    { connection, version, orderId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.post(`/order/${orderId}`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    orderId,
    shipbob_channel_id: { ...shipbob_channel_id, required: true },
  },
  examplePayload: cancelOrderExamplePayload,
});
