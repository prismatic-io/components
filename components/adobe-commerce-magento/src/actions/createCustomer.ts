import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { createCustomerExampleResponse } from "../examplePayloads";
import { validateJSON } from "../helpers";
import { connectionInput, customer, password, redirectUrl } from "../inputs";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create customer account.",
  },
  perform: async (context, { connection, customer, password, redirectUrl }) => {
    const client = await getClient(connection, context.debug.enabled);

    const body = validateJSON(customer);
    if (!body) {
      throw new Error("Customer must be valid JSON.");
    }

    if (password) {
      body.password = password;
    }
    if (redirectUrl) {
      body.redirectUrl = redirectUrl;
    }
    try {
      const { data } = await client.post("/customers", body);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    customer,
    password,
    redirectUrl,
  },
  examplePayload: createCustomerExampleResponse,
});

export default { createCustomer };
