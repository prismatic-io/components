import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  maxResults,
  pageToken,
  view,
  label,
  name,
  fetchAll,
} from "../../inputs";
import { fetchAllAccounts } from "../../helpers/fetchAllAccounts";
import type { content_v2_1 } from "googleapis";
import { listAccountsExamplePayload } from "../../examplePayloads";

export const listAccounts = action({
  display: {
    description: "Lists the sub-accounts in your Merchant Center account.",
    label: "List Accounts",
  },
  inputs: {
    connectionInput,
    merchantId,
    maxResults,
    pageToken,
    view,
    label,
    name,
    fetchAll,
  },
  perform: async (
    _context,
    {
      connectionInput,
      maxResults,
      pageToken,
      view,
      label,
      name,
      merchantId,
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);

    const params: content_v2_1.Params$Resource$Accounts$List = {
      merchantId,
      maxResults: maxResults || undefined,
      pageToken: pageToken || undefined,
      view: view || undefined,
      label: label || undefined,
      name: name || undefined,
    };

    const { data } = await fetchAllAccounts({ client, fetchAll, params });

    return {
      data,
    };
  },
  examplePayload: listAccountsExamplePayload,
});
