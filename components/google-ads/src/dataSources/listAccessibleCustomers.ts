import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listAccessibleCustomersDataSourceExamplePayload } from "../examplePayloads";
import { listAccessibleCustomersInputs } from "../inputs";
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
  inputs: listAccessibleCustomersInputs,
  perform: async (context, { connection }) => {
    const client = createClient({
      connection: connection,
      debugEnabled: false,
      logger: context.logger,
    });
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
  examplePayload: listAccessibleCustomersDataSourceExamplePayload,
});
