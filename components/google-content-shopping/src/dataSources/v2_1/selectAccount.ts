import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { selectAccountExamplePayload } from "../../examplePayloads/v2_1";
import { selectAccountInputs } from "../../inputs/v2_1";
import { fetchAllPages } from "../../util/pagination";
import { toPicklist } from "../../util/picklist";
export const selectAccount = dataSource({
  display: {
    label: "Select Account (Legacy v2.1)",
    description: "A picklist of sub-accounts in the Merchant Center account.",
  },
  inputs: selectAccountInputs,
  perform: async (_context, { connection, merchantId }) => {
    const client = createClient(connection);
    const allResources = await fetchAllPages(async (pageToken) => {
      const { data } = await client.accounts.list({ merchantId, pageToken });
      return {
        items: data.resources ?? [],
        nextPageToken: data.nextPageToken ?? undefined,
      };
    });
    return toPicklist(allResources, (account) => ({
      label: account.name || account.id?.toString() || "Unknown",
      key: account.id?.toString() || "",
    }));
  },
  dataSourceType: "picklist",
  examplePayload: selectAccountExamplePayload,
});
