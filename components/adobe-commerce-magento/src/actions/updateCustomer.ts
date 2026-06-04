import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { updateCustomerExampleResponse } from "../examplePayloads";
import { validateJSON } from "../helpers";
import { connectionInput, customer, customerId, passwordHash } from "../inputs";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Create or update a customer.",
  },
  perform: async (context, { connection, customerId, passwordHash, customer }) => {
    const client = await getClient(connection, context.debug.enabled);

    const body = validateJSON(customer);
    if (!body) {
      throw new Error("Customer must be valid JSON.");
    }

    if (passwordHash) {
      body.passwordHash = passwordHash;
    }

    try {
      const { data } = await client.put(`/customers/${customerId}`, body);
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
    passwordHash,
    customer,
  },
  examplePayload: updateCustomerExampleResponse,
});

export default { updateCustomer };
