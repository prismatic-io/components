import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection, customerContactId, customerId } from "../../../inputs";

export const deletCustomersContact = action({
  display: {
    label: "Delete Customer Contact",
    description: "Removes a contact from a customer",
  },
  inputs: {
    connection,
    customerId,
    customerContactId,
  },
  perform: async (context, { connection, customerContactId, customerId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.delete(
      `/customers/${customerId}/contacts/${customerContactId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: {},
  },
});
