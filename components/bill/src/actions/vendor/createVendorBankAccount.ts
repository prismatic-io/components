import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createVendorBankAccountInputs } from "../../inputs/vendor";
import { createVendorBankAccountExamplePayload } from "../../examplePayloads";

export const createVendorBankAccount = action({
  display: {
    label: "Create Vendor Bank Account",
    description: "Create a vendor bank account object.",
  },
  perform: async (
    context,
    { connection, vendorId, accountNumber, routingNumber, mfaId, deviceId },
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
      obj: {
        entity: "VendorBankAccount",
        vendorId,
        accountNumber,
        routingNumber,
      },
    };

    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Create/VendorBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: createVendorBankAccountInputs,
  examplePayload: createVendorBankAccountExamplePayload,
});
