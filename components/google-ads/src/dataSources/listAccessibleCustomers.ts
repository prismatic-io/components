import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listAccessibleCustomersDataSourceInputs } from "../inputs";
import {
  cleanCustomerId,
  formatAccountNumber,
  getCustomerDescriptiveName,
} from "../util";

export const listAccessibleCustomers = dataSource({
  display: {
    label: "List Accessible Customers",
    description: "Get a list of accessible customers for the logged in user.",
  },
  inputs: listAccessibleCustomersDataSourceInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, false, context.logger);
    const { data } = await client.get("customers:listAccessibleCustomers");

    const clientAccounts = await Promise.all(
      data.resourceNames.map(async (resourceName: string) => {
        const customerId = cleanCustomerId(resourceName);
        const descriptiveName = await getCustomerDescriptiveName(
          client,
          customerId,
        );
        const label = `${descriptiveName} - ${formatAccountNumber(customerId)}`;

        return {
          label,
          key: customerId,
        } as Element;
      }),
    );
    return { result: clientAccounts };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Account - 123-456-7890", key: "1234567890" }],
  },
});
