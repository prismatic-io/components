import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, accountId, merchantId } from "../../inputs";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    description: "Deletes a Merchant Center sub-account.",
    label: "Delete Account",
  },
  inputs: {
    connectionInput,
    merchantId,
    accountId,
  },
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
