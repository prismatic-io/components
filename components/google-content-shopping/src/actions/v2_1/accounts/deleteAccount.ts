import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { deleteAccountExamplePayload } from "../../../examplePayloads/v2_1";
import { deleteAccountInputs } from "../../../inputs/v2_1";
export const deleteAccount = action({
  display: {
    description: "Deletes a Merchant Center sub-account.",
    label: "Delete Account (Legacy v2.1)",
  },
  inputs: deleteAccountInputs,
  perform: async (_context, { connectionInput, accountId, merchantId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.delete({
      accountId,
      merchantId,
    });
    return {
      data,
    };
  },
  examplePayload: deleteAccountExamplePayload,
});
