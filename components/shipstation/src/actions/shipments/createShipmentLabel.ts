import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { createShipmentLabelExamplePayload } from "../../examplePayloads";
import { createShipmentLabelInputs } from "../../inputs";

export const createShipmentLabel = action({
  display: {
    label: "Create Shipment Label",
    description: "Creates a shipping label.",
  },
  inputs: createShipmentLabelInputs,
  perform: async (
    context,
    {
      connectionInput,
      carrierCode,
      serviceCode,
      packageCode,
      shipDate,
      weight,
      shipTo,
      shipFrom,
      additionalFields,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const body = {
      carrierCode,
      serviceCode,
      packageCode,
      shipDate,
      weight,
      shipTo,
      shipFrom,
      ...additionalFields,
    };

    const { data } = await client.post("/shipments/createlabel", body);
    return { data };
  },
  examplePayload: createShipmentLabelExamplePayload,
});
