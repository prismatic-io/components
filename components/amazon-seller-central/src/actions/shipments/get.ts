import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getShipmentExamplePayload } from "../../examplePayloads/shipments";
import { connectionInput, shipmentId } from "../../inputs";

export const getShipment = action({
  display: {
    label: "Get Shipment",
    description: "Returns the shipment information for an existing shipment.",
  },
  examplePayload: getShipmentExamplePayload,
  inputs: {
    connectionInput,
    shipmentId,
  },
  perform: async (context, { connectionInput, shipmentId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/mfn/v0/shipments/${shipmentId}`);
    return {
      data,
    };
  },
});
