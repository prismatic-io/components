import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import { deleteCustomerInputs } from "../../inputs";
export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete customer by Customer ID.",
  },
  performSafety: "notAllowed",
  examplePerform: async () => deleteCustomerExamplePayload,
  perform: async (context, { connection, customerId }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `${ENDPOINTS.customers}/${encodeURIComponent(customerId)}`,
    );
    return { data };
  },
  inputs: deleteCustomerInputs,
  examplePayload: deleteCustomerExamplePayload,
});
