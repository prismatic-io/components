import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description:
      "Retrieves a specific customer by their system-generated identifier.",
  },
  perform: async (context, { connectionInput, customerId }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const { data } = await client.get(`/customers/${customerId}`);
    return { data };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload,
});
