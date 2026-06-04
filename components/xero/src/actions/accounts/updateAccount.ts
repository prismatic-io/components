import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  accountId,
  accountCode,
  accountName,
  accountType,
  purchaseTaxType,
  description,
  enablePaymentsToAccount,
  fieldValues,
  showInExpenseClaims,
  connectionInput,
} from "../../inputs";
import { updateAccountExamplePayload } from "../../examplePayloads";

export const updateAccount = action({
  display: {
    label: "Update Account",
    description:
      "Update the information and metadata of an existing account by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const accountData = {
      AccountID: util.types.toString(params.accountId) || undefined,
      Code: util.types.toString(params.accountCode) || undefined,
      Name: util.types.toString(params.accountName) || undefined,
      Type: util.types.toString(params.accountType) || undefined,
      TaxType: util.types.toString(params.purchaseTaxType) || undefined,
      Description: util.types.toString(params.description) || undefined,
      EnablePaymentsToAccount: params.enablePaymentsToAccount || undefined,
      ShowInExpenseClaims: params.showInExpenseClaims,
      ...(util.types.keyValPairListToObject(params.fieldValues) || undefined),
    };
    const { data } = await client.post(
      `/accounts/${params.accountId}`,
      accountData,
    );
    return { data };
  },
  inputs: {
    accountId,
    accountCode: { ...accountCode, required: false },
    accountName: { ...accountName, required: false },
    accountType: { ...accountType, required: false },
    purchaseTaxType,
    description,
    enablePaymentsToAccount,
    fieldValues,
    showInExpenseClaims,
    xeroConnection: connectionInput,
  },

  examplePayload: updateAccountExamplePayload,
});
