import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getAccountExamplePayload } from "../../../examplePayloads/v2_1";
import { getAccountInputs } from "../../../inputs/v2_1";
export const getAccount = action({
  display: {
    description: "Retrieves a Merchant Center account.",
    label: "Get Account (Legacy v2.1)",
  },
  inputs: getAccountInputs,
  perform: async (
    _context,
    { connectionInput, accountId, view, merchantId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.get({
      merchantId,
      accountId,
      view,
    });
    return {
      data,
    };
  },
  examplePayload: getAccountExamplePayload,
});
