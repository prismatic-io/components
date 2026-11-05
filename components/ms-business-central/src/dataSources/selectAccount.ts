import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { companyId } from "../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../inputs/general";
import type { Account, MultipleItemsResponse } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "A picklist of accounts in your Business Central organization.",
  },
  inputs: {
    connection: connectionInput,
    companyId: { ...companyId, dataSource: undefined },
  },
  perform: async (context, { connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<Account[]>>(
      `/companies(${companyId})/accounts`,
    );

    return {
      result: toSortedPicklist(data.value, (account) => ({
        key: account.id,
        label: `${account.number} - ${account.displayName}`,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "10100 - Cash", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
