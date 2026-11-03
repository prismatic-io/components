import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { cancelShipmentExamplePayload } from "../../examplePayloads/shipments";
import { cancelShipmentInputs } from "../../inputs";
import { cancelShipmentOutputSchema } from "../../outputSchemas";

export const cancelShipment = action({
  display: {
    label: "Cancel Shipment",
    description:
      "Cancels the shipment indicated by the specified shipment identifier.",
  },
  examplePayload: cancelShipmentExamplePayload,
  inputs: cancelShipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: cancelShipmentOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (context, { connectionInput, shipmentId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/mfn/v0/shipments/${shipmentId}`);
    return {
      data,
    };
  },
  examplePerform: async () => cancelShipmentExamplePayload,
});
