import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import { updateCustomerInputs } from "../../inputs";
import { asJsonObject } from "../../utils";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer.",
  },
  performSafety: "notAllowed",
  examplePerform: async () => updateCustomerExamplePayload,
  perform: async (
    context,
    { connection, customerId, passwordHash, customer },
  ) => {
    const client = await getClient(connection, context.debug.enabled);
    const body = asJsonObject(customer, "Customer");
    if (passwordHash) {
      body.passwordHash = passwordHash;
    }
    const { data } = await client.put(
      `${ENDPOINTS.customers}/${encodeURIComponent(customerId)}`,
      body,
    );
    return { data };
  },
  inputs: updateCustomerInputs,
  examplePayload: updateCustomerExamplePayload,
});
