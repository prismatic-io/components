import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import deleteCustomerContactInputs from "../../inputs/customerContact/deleteCustomerContactInputs";
import { emptyPayload } from "../../examplePayloads";

export const deleteCustomerContact = action({
  display: {
    label: "Delete Customer Contact",
    description: "Delete a customer contact",
  },
  perform: async (
    context,
    { connection, site, company, customerContactId },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.delete(
      `/customer_contacts/${customerContactId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...deleteCustomerContactInputs,
  },
  examplePayload: emptyPayload,
});
