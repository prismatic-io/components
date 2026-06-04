import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { deleteCustomerExampleResponse } from "../examplePayloads";
import { connectionInput, customerId } from "../inputs";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete customer by Customer ID.",
  },
  perform: async (context, { connection, customerId }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.delete(`/customers/${customerId}`);
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
  examplePayload: deleteCustomerExampleResponse,
});

export default { deleteCustomer };
