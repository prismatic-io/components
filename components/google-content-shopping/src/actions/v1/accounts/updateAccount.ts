import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { updateAccountExamplePayload } from "../../../examplePayloads/v1";
import { updateAccountInputs } from "../../../inputs/v1/accounts";
import { accountResourceName } from "../../../util/resourceNames";
export const updateAccountMerchant = action({
  display: {
    description:
      "Updates a Merchant Center account, using Update Mask to control which fields are applied.",
    label: "Update Account (Merchant v1)",
  },
  inputs: updateAccountInputs,
  perform: async (
    context,
    {
      connectionInput,
      account,
      accountName,
      timeZone,
      languageCode,
      updateMask,
    },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const requestBody = {
      accountName,
      ...(timeZone ? { timeZone: { id: timeZone } } : {}),
      languageCode,
    };
    const { data } = await client.patch(
      `/accounts/v1/${accountResourceName(account)}`,
      requestBody,
      { params: { updateMask } },
    );
    return { data };
  },
  examplePayload: updateAccountExamplePayload,
});
