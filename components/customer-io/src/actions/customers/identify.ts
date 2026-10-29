import { action } from "@prismatic-io/spectral";
import { identifyInputs } from "../../inputs";
import { createCustomerClient } from "../../client";
import { identifyExamplePayload } from "../../examplePayloads";

export const identify = action({
  display: {
    label: "Identify",
    description: "Create or update a customer.",
  },
  perform: async (context, { id, region, customerData, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.identify(id, customerData),
    };
  },
  inputs: identifyInputs,
  examplePayload: identifyExamplePayload,
});

export default identify;
