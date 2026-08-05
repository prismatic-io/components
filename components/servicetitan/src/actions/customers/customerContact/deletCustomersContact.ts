import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { deleteCustomerContactExamplePayload } from "../../../examplePayloads";
import { deleteCustomerContactInputs } from "../../../inputs";
export const deletCustomersContact = action({
  display: {
    label: "Delete Customer Contact",
    description: "Removes a contact from a customer",
  },
  inputs: deleteCustomerContactInputs,
  perform: async (context, { connection, customerContactId, customerId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.delete(
      `/customers/${customerId}/contacts/${customerContactId}`,
    );
    return {
      data,
    };
  },
  examplePayload: deleteCustomerContactExamplePayload,
});
