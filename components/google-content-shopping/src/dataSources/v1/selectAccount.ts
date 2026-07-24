import { dataSource } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../client";
import { selectAccountMerchantExamplePayload } from "../../examplePayloads/v1";
import { selectAccountMerchantInputs } from "../../inputs/v1";
import type { AccountSummary } from "../../types";
import { fetchAllPages } from "../../util/pagination";
import { toPicklist } from "../../util/picklist";
export const selectAccountMerchant = dataSource({
  display: {
    label: "Select Account (Merchant v1)",
    description:
      "A picklist of Merchant Center accounts accessible to the connection.",
  },
  inputs: selectAccountMerchantInputs,
  perform: async (_context, { connection }) => {
    const client = createClientMerchant(connection);
    const accounts = await fetchAllPages<AccountSummary>(async (token) => {
      const { data } = await client.get("/accounts/v1/accounts", {
        params: { pageToken: token },
      });
      return {
        items: data.accounts ?? [],
        nextPageToken: data.nextPageToken,
      };
    });
    return toPicklist(accounts, (account) => ({
      label: account.accountName || account.accountId || "Unknown",
      key: account.accountId || "",
    }));
  },
  dataSourceType: "picklist",
  examplePayload: selectAccountMerchantExamplePayload,
});
