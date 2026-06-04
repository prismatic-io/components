import { action, util } from "@prismatic-io/spectral";
import { id, region, customerData, connectionInput } from "../inputs";
import { createCustomerClient } from "../client";
import { identifyExamplePayload } from "../examplePayloads";

export const identify = action({
  display: {
    label: "Identify",
    description: "Create or update a customer",
  },
  perform: async (context, { id, region, customerData, cioConnection }) => {
    const client = createCustomerClient(cioConnection, region);

    return {
      data: await client.identify(
        util.types.toString(id),
        util.types.keyValPairListToObject(customerData)
      ),
    };
  },
  inputs: { id, region, customerData, cioConnection: connectionInput },
  examplePayload: identifyExamplePayload,
});

export default identify;
