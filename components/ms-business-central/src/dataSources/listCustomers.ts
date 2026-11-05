import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { Customer, MultipleItemsResponse } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listCustomers = dataSource({
  display: {
    label: "Select Customers",
    description: "A picklist of customer objects in your Business Central organization.",
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<Customer[]>>(
      `/companies(${companyId})/customers`,
    );

    return {
      result: toSortedPicklist(data.value, (customer) => ({
        key: customer.id,
        label: customer.displayName,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Adatum Corporation", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
