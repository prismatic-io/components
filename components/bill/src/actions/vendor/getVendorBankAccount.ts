import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getVendorBankAccountInputs } from "../../inputs/vendor";
import { getVendorBankAccountExamplePayload } from "../../examplePayloads";

export const getVendorBankAccount = action({
  display: {
    label: "Get Vendor Bank Account",
    description: "Read a vendor bank account object.",
  },
  perform: async (context, { connection, vendorBankAccountId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
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
      "/Crud/Read/VendorBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getVendorBankAccountInputs,
  examplePayload: getVendorBankAccountExamplePayload,
});
