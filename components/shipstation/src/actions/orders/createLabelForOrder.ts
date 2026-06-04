import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { createLabelForOrderExamplePayload } from "../../examplePayloads";
import { createLabelForOrderInputs } from "../../inputs";

export const createLabelForOrder = action({
  display: {
    label: "Create Label for Order",
    description: "Creates a shipping label for a specified order.",
  },
  inputs: createLabelForOrderInputs,
  perform: async (
    context,
    {
      orderIdInput,
      carrierCode,
      serviceCode,
      confirmation,
      shipDate,
      testLabel,
      connectionInput,
      additionalFields,
    },
  ) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const payload = {
      orderIdInput,
      carrierCode,
      serviceCode,
      confirmation,
      shipDate,
      testLabel,
      ...additionalFields,
    };

    const { data } = await client.post("/orders/createlabelfororder", payload);
    return { data };
  },
  examplePayload: createLabelForOrderExamplePayload,
});
