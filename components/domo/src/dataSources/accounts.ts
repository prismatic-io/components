import { dataSource, input } from "@prismatic-io/spectral";
import type { ListAccountsQueryParams } from "../actions/types/ListAccountsQueryParams";
import type { ListAccountTypesQueryParams } from "../actions/types/ListAccountTypesQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset } from "../inputs";

const accounts = dataSource({
  display: {
    label: "Select Account",
    description: "Selects a Domo account.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListAccountsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;

    const { data } = await client.get(`/accounts`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((account: Record<string, string>) => ({
        label: account.name,
        key: String(account.id),
      })),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The number of Accounts to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of Accounts to begin the list of Accounts within the response.",
    }),
  },
});

const accountTypes = dataSource({
  display: {
    label: "Select Account Type",
    description: "Selects a Domo account type.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListAccountTypesQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;

    const { data } = await client.get(`/account-types`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data.map((accountType: Record<string, string>) => ({
        label: accountType.name,
        key: String(accountType.id),
      })),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The number of Account Types to return in the list. The default is 50 and the maximum is 500.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the Account Types to begin list of Account Types within the response.",
    }),
  },
});

export default { accounts, accountTypes };
