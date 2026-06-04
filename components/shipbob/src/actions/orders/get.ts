import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrderExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  orderId,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Retrieve an order by Order ID",
  },
  perform: async (
    context,
    { connection, version, orderId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/order/${orderId}`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    orderId,
    shipbob_channel_id,
  },
  examplePayload: getOrderExamplePayload,
});
