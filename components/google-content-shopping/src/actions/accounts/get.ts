import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, accountId, view, merchantId } from "../../inputs";
import { getAccountExamplePayload } from "../../examplePayloads";

export const getAccount = action({
  display: {
    description: "Retrieves a Merchant Center account.",
    label: "Get Account",
  },
  inputs: {
    connectionInput,
    merchantId,
    accountId,
    view,
  },
  perform: async (
    _context,
    { connectionInput, accountId, view, merchantId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.get({
      merchantId,
      accountId,
      view: view || undefined,
    });
    return {
      data,
    };
  },
  examplePayload: getAccountExamplePayload,
});
