import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { getAccountExamplePayload } from "../../../examplePayloads/v1";
import { getAccountInputs } from "../../../inputs/v1/accounts";
import { accountResourceName } from "../../../util/resourceNames";
export const getAccountMerchant = action({
  display: {
    description: "Retrieves a Merchant Center account.",
    label: "Get Account (Merchant v1)",
  },
  inputs: getAccountInputs,
  perform: async (context, { connectionInput, account }) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/accounts/v1/${accountResourceName(account)}`,
    );
    return { data };
  },
  examplePayload: getAccountExamplePayload,
});
