import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { customerId } from "../../inputs/customers/getCustomerInputs";
import { connectionInput } from "../../inputs/general";
import type { Customer } from "../../interfaces";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description:
      "Retrieve the properties and relationships of a customer object in your Business Central organization.",
  },
  perform: async (context, { connection, customerId, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<Customer>(
      `/companies(${companyId})/customers(${customerId})`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    customerId,
  },
  examplePayload: getCustomerExamplePayload,
});
