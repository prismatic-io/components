import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { createCustomerContactExamplePayload } from "../../../examplePayloads";
import { createCustomerContactInputs } from "../../../inputs";
export const createCustomerContact = action({
  display: {
    label: "Create Customer Contact",
    description: "Create a contact for a customer",
  },
  inputs: createCustomerContactInputs,
  perform: async (context, { connection, customerId, memo, type, value }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/customers/${customerId}/contacts`, {
      memo,
      type,
      value,
    });
    return {
      data,
    };
  },
  examplePayload: createCustomerContactExamplePayload,
});
