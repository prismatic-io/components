import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAllShipmentsForOrderExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  orderId,
  shipbob_channel_id,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const getAllShipmentsForOrder = action({
  display: {
    label: "Get All Shipments for Order",
    description: "Retrieve all Shipments on an Order by Order ID",
  },
  perform: async (
    context,
    { connection, version, orderId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/order/${orderId}/shipment`, {
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
  examplePayload: getAllShipmentsForOrderExamplePayload,
});
