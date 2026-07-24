import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { listAccountsExamplePayload } from "../../../examplePayloads/v1";
import { listAccountsInputs } from "../../../inputs/v1/accounts";
import { fetchAllPages } from "../../../util/pagination";
export const listAccountsMerchant = action({
  display: {
    description:
      "Lists the Merchant Center accounts accessible to the authenticated user.",
    label: "List Accounts (Merchant v1)",
  },
  inputs: listAccountsInputs,
  perform: async (context, { connectionInput, pagination, fetchAll }) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    if (fetchAll) {
      const accounts = await fetchAllPages(async (token) => {
        const { data } = await client.get("/accounts/v1/accounts", {
          params: { pageSize: pagination.pageSize, pageToken: token },
        });
        return {
          items: data.accounts ?? [],
          nextPageToken: data.nextPageToken,
        };
      });
      return { data: { accounts } };
    }
    const { data } = await client.get("/accounts/v1/accounts", {
      params: {
        pageSize: pagination.pageSize,
        pageToken: pagination.pageToken,
      },
    });
    return { data };
  },
  examplePayload: listAccountsExamplePayload,
});
