import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { getCustomerExampleResponse } from "../examplePayloads";
import { connectionInput, customerId } from "../inputs";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Get customer by Customer ID.",
  },
  perform: async (context, { connection, customerId }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(`/customers/${customerId}`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    customerId,
  },
  examplePayload: getCustomerExampleResponse,
});

export default { getCustomer };
