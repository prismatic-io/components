import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create customer account.",
  },
  performSafety: "notAllowed",
  examplePerform: async () => createCustomerExamplePayload,
  perform: async (context, { connection, customer, password, redirectUrl }) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(customer, "Customer");
    if (password) {
      body.password = password;
    }
    if (redirectUrl) {
      body.redirectUrl = redirectUrl;
    }
    const { data } = await client.post(ENDPOINTS.customers, body);
    return { data };
  },
  inputs: createCustomerInputs,
  examplePayload: createCustomerExamplePayload,
});
