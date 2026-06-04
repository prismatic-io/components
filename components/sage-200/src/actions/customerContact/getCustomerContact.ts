import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getCustomerContactInputs from "../../inputs/customerContact/getCustomerContactInputs";
import { getCustomerContactPayload } from "../../examplePayloads";

export const getCustomerContact = action({
  display: {
    label: "Get Customer Contact",
    description: "Retrieve a customer contact by ID",
  },
  perform: async (
    context,
    { connection, customerContactId, site, company },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(
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
    ...getCustomerContactInputs,
  },
  examplePayload: getCustomerContactPayload,
});
