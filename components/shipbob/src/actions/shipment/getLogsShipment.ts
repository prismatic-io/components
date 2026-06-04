import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLogsShipmentExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  shipbob_channel_id,
  shipmentId,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const getLogsShipment = action({
  display: {
    label: "Get Logs for Shipment",
    description: "Retrieve logs for a Shipment by Shipment ID",
  },
  perform: async (
    context,
    { connection, version, shipmentId, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.get(`/shipment/${shipmentId}/logs`, {
      headers,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    shipmentId,
    shipbob_channel_id,
  },
  examplePayload: getLogsShipmentExamplePayload,
});
