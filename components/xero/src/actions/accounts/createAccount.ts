import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { createAccountInputs } from "../../inputs";
import { createAccountExamplePayload } from "../../examplePayloads";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Create a new account.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.put("/accounts", {
      Code: util.types.toString(params.accountCode) || undefined,
      Name: util.types.toString(params.accountName) || undefined,
      Type: util.types.toString(params.accountType) || undefined,
      ...util.types.keyValPairListToObject(params.fieldValues),
      BankAccountNumber:
        util.types.toString(params.bankAccountNumber) || undefined,
      ShowInExpenseClaims:
        util.types.toBool(params.showInExpenseClaims) === false
          ? undefined
          : params.showInExpenseClaims || undefined,
    });
    return { data };
  },
  inputs: createAccountInputs,

  examplePayload: createAccountExamplePayload,
});
