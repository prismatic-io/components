import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Get customer by Customer ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, customerId }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.customers}/${encodeURIComponent(customerId)}`,
    );
    return { data };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload,
});
