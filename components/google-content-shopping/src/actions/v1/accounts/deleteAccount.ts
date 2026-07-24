import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { deleteAccountExamplePayload } from "../../../examplePayloads/v1";
import { deleteAccountInputs } from "../../../inputs/v1/accounts";
import { accountResourceName } from "../../../util/resourceNames";
export const deleteAccountMerchant = action({
  display: {
    description: "Deletes a Merchant Center account.",
    label: "Delete Account (Merchant v1)",
  },
  inputs: deleteAccountInputs,
  perform: async (context, { connectionInput, account }) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/accounts/v1/${accountResourceName(account)}`,
    );
    return { data };
  },
  examplePayload: deleteAccountExamplePayload,
});
