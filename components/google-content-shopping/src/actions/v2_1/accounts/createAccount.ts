import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { createAccountExamplePayload } from "../../../examplePayloads/v2_1";
import { createAccountInputs } from "../../../inputs/v2_1";
export const createAccount = action({
  display: {
    description: "Creates a Merchant Center sub-account.",
    label: "Create Account (Legacy v2.1)",
  },
  inputs: createAccountInputs,
  perform: async (_context, { connectionInput, merchantId, ...params }) => {
    const client = createClient(connectionInput);
    const { data } = await client.accounts.insert({
      merchantId,
      requestBody: {
        id: null,
        ...params,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createAccountExamplePayload,
});
