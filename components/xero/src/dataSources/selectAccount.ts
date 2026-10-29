import { dataSource, type Element } from "@prismatic-io/spectral";
import { getXeroClient } from "../client";
import { selectAccountInputs } from "../inputs";
import type { Account } from "../interfaces/Account";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "Select an account from the list.",
  },
  inputs: selectAccountInputs,
  dataSourceType: "picklist",
  perform: async (context, { xeroConnection }) => {
    const client = await getXeroClient(xeroConnection, false);
    const { data } = await client.get<{ Accounts: Account[] }>("/accounts");

    const result = (data.Accounts || []).map<Element>((account) => ({
      label: account.Name,
      key: account.AccountID,
    }));
    return { result };
  },
});
