import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { updateAccountExamplePayload } from "../../../examplePayloads/v2_1";
import { updateAccountInputs } from "../../../inputs/v2_1";
export const updateAccount = action({
  display: {
    description:
      "Updates a Merchant Center account, deleting any fields that are not provided from the resource.",
    label: "Update Account (Legacy v2.1)",
  },
  inputs: updateAccountInputs,
  perform: async (
    _context,
    { connectionInput, merchantId, accountId, ...params },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.update({
      merchantId,
      accountId,
      requestBody: {
        id: null,
        ...params,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updateAccountExamplePayload,
});
