import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { deleteVendorBankAccountInputs } from "../../inputs/vendor";
import { deleteVendorBankAccountExamplePayload } from "../../examplePayloads";

export const deleteVendorBankAccount = action({
  display: {
    label: "Delete Vendor Bank Account",
    description: "Delete a vendor bank account object.",
  },
  perform: async (
    context,
    { connection, vendorBankAccountId, mfaId, deviceId },
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
      id: vendorBankAccountId,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Delete/VendorBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: deleteVendorBankAccountInputs,
  examplePayload: deleteVendorBankAccountExamplePayload,
});
