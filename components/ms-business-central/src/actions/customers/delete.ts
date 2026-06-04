import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { customerId } from "../../inputs/customers/getCustomerInputs";
import { connectionInput } from "../../inputs/general";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Deletes a customer object in your Business Central organization.",
  },
  perform: async (context, { customerId, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    await client.delete(`/companies(${companyId})/customers(${customerId})`);

    return SUCCESS_PAYLOAD;
  },
  inputs: {
    connection: connectionInput,
    companyId,
    customerId,
  },
  examplePayload: SUCCESS_PAYLOAD,
});
