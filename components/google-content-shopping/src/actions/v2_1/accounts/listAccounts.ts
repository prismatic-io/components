import { action } from "@prismatic-io/spectral";
import type { content_v2_1 } from "googleapis";
import { createClient } from "../../../client";
import { listAccountsExamplePayload } from "../../../examplePayloads/v2_1";
import { listAccountsInputs } from "../../../inputs/v2_1";
import { fetchAllAccounts } from "../../../util/fetchAllAccounts";
export const listAccounts = action({
  display: {
    description: "Lists the sub-accounts in the Merchant Center account.",
    label: "List Accounts (Legacy v2.1)",
  },
  inputs: listAccountsInputs,
  perform: async (
    _context,
    { connectionInput, pagination, view, label, name, merchantId, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    const params: content_v2_1.Params$Resource$Accounts$List = {
      merchantId,
      maxResults: pagination.maxResults,
      pageToken: pagination.pageToken,
      view,
      label,
      name,
    };
    const { data } = await fetchAllAccounts({ client, fetchAll, params });
    return {
      data,
    };
  },
  examplePayload: listAccountsExamplePayload,
});
