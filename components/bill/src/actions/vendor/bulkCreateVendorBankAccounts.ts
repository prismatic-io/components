import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkCreateVendorBankAccountsInputs } from "../../inputs/vendor";
import { bulkCreateVendorBankAccountsExamplePayload } from "../../examplePayloads";

export const bulkCreateVendorBankAccounts = action({
  display: {
    label: "Bulk Create Vendor Bank Accounts",
    description: "Bulk create vendor bank account objects.",
  },
  perform: async (
    context,
    { connection, vendorBankAccountCreateBulk, mfaId, deviceId },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
      {
        mfaId,
        deviceId,
      },
    );

    const sendData = {
      bulk: vendorBankAccountCreateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Create/VendorBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkCreateVendorBankAccountsInputs,
  examplePayload: bulkCreateVendorBankAccountsExamplePayload,
});
