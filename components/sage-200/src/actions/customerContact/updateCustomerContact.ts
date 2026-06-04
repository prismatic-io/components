import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import updateCustomerContactInputs from "../../inputs/customerContact/updateCustomerContactInputs";
import { updateCustomerContactPayload } from "../../examplePayloads";

export const updateCustomerContact = action({
  display: {
    label: "Update Customer Contact",
    description: "Edit an existing customer contact by ID",
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      site,
      company,
      salutationId,
      firstName,
      middleName,
      lastName,
      isToDelete,
      emails,
      telephones,
      mobiles,
      faxes,
      websites,
      roles,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      salutation_id: salutationId,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      is_to_delete: isToDelete,
      emails,
      telephones,
      mobiles,
      faxes,
      websites,
      roles,
    };
    const { data } = await client.put(
      `/customer_contacts/${customerId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...updateCustomerContactInputs,
  },
  examplePayload: updateCustomerContactPayload,
});
