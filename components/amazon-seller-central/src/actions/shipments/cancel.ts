import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelShipmentExamplePayload } from "../../examplePayloads/shipments";
import { connectionInput, shipmentId } from "../../inputs";

export const cancelShipment = action({
  display: {
    label: "Cancel Shipment",
    description:
      "Cancel the shipment indicated by the specified shipment identifier.",
  },
  examplePayload: cancelShipmentExamplePayload,
  inputs: {
    connectionInput,
    shipmentId: {
      ...shipmentId,
      comments:
        "The Amazon-defined shipment identifier for the shipment to cancel.	",
    },
  },
  perform: async (context, { connectionInput, shipmentId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/mfn/v0/shipments/${shipmentId}`);
    return {
      data,
    };
  },
});
