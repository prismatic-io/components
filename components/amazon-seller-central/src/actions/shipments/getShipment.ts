import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getShipmentExamplePayload } from "../../examplePayloads/shipments";
import { getShipmentInputs } from "../../inputs";
import { getShipmentOutputSchema } from "../../outputSchemas";

export const getShipment = action({
  display: {
    label: "Get Shipment",
    description: "Returns the shipment information for an existing shipment.",
  },
  examplePayload: getShipmentExamplePayload,
  inputs: getShipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getShipmentOutputSchema,
  }),
  performSafety: PerformSafety.SAFE,
  perform: async (context, { connectionInput, shipmentId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/mfn/v0/shipments/${shipmentId}`);
    return {
      data,
    };
  },
  examplePerform: async () => getShipmentExamplePayload,
});
