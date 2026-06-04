import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { GET_ACCOUNT_HIERARCHY_QUERY } from "../constants";
import { listAccessibleSubAccountsDataSourceInputs } from "../inputs";
import type { CustomerClientResult } from "../types";
import { formatAccountNumber, searchGoogleAds } from "../util";

export const listAccessibleSubAccounts = dataSource({
  display: {
    label: "List Accessible Sub Accounts",
    description:
      "Get a list of accessible sub accounts for the customer ID provided.",
  },
  inputs: listAccessibleSubAccountsDataSourceInputs,
  perform: async (context, { connection, customerId, customerClientLevel }) => {
    const client = createClient(connection, false, context.logger);
    const data = await searchGoogleAds<CustomerClientResult>(client, {
      customerId,
      params: {
        query: `${GET_ACCOUNT_HIERARCHY_QUERY}${customerClientLevel}`,
      },
      fetchAll: true,
    });

    const results = data.results ?? [];

    return {
      result: results.map(({ customerClient }) => {
        return {
          label: `${customerClient.descriptiveName} - ${formatAccountNumber(customerClient.id)}`,
          key: customerClient.id,
        } as Element;
      }),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Account - 123-456-7890", key: "1234567890" }],
  },
});
