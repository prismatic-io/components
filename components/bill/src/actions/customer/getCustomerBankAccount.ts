import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getCustomerBankAccountInputs } from "../../inputs/customer";
import { getCustomerBankAccountExamplePayload } from "../../examplePayloads";

export const getCustomerBankAccount = action({
  display: {
    label: "Get Customer Bank Account",
    description: "Read a customer bank account object.",
  },
  perform: async (context, { connection, customerBankAccountId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      id: customerBankAccountId,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Read/CustomerBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getCustomerBankAccountInputs,
  examplePayload: getCustomerBankAccountExamplePayload,
});
