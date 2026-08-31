import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { GET_ACCOUNT_HIERARCHY_QUERY } from "../constants";
import { listAccessibleSubAccountsExamplePayload } from "../examplePayloads";
import { listAccessibleSubAccountsInputs } from "../inputs";
import type { CustomerClientResult } from "../types";
import { formatAccountNumber, searchGoogleAds } from "../util";
export const listAccessibleSubAccounts = dataSource({
  display: {
    label: "List Accessible Sub Accounts",
    description:
      "Get a list of accessible sub accounts for the customer ID provided.",
  },
  inputs: listAccessibleSubAccountsInputs,
  perform: async (context, { connection, customerId, customerClientLevel }) => {
    const client = createClient({
      connection: connection,
      debugEnabled: false,
      logger: context.logger,
    });
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
  examplePayload: listAccessibleSubAccountsExamplePayload,
});
