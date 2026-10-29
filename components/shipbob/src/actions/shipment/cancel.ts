import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelShipmentExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  shipbob_channel_id,
  shipment_ids,
  version,
} from "../../inputs";
import { generatePayload } from "../util";

export const cancelShipment = action({
  display: {
    label: "Cancel Shipments",
    description: "Cancel multiple Shipments by Shipment ID",
  },
  perform: async (
    context,
    { connection, version, shipment_ids, shipbob_channel_id },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const headers = generatePayload({ shipbob_channel_id });
    const { data } = await client.post(
      `/shipment/cancelbulk`,
      {
        shipment_ids,
      },
      {
        headers,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    shipbob_channel_id: { ...shipbob_channel_id, required: true },
    shipment_ids,
  },
  examplePayload: cancelShipmentExamplePayload,
});
