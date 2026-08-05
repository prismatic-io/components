import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { createCustomerContactExamplePayload as updateCustomerContactExamplePayload } from "../../../examplePayloads";
import { updateCustomerContactInputs } from "../../../inputs";
export const updateCustomerContact = action({
  display: {
    label: "Update Customer Contact",
    description: "Updates a contact on the customers",
  },
  inputs: updateCustomerContactInputs,
  perform: async (
    context,
    { connection, customerId, memo, type, value, customerContactId },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(
      `/customers/${customerId}/contacts/${customerContactId}`,
      {
        memo,
        type,
        value,
      },
    );
    return {
      data,
    };
  },
  examplePayload: updateCustomerContactExamplePayload,
});
