import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createCustomerBankAccountInputs } from "../../inputs/customer";
import { createCustomerBankAccountExamplePayload } from "../../examplePayloads";

export const createCustomerBankAccount = action({
  display: {
    label: "Create Customer Bank Account",
    description: "Create a customer bank account object.",
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      nameOnAccount,
      routingNumber,
      accountNumber,
      additionalFields,
      agreedWithTOS,
    },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        entity: "CustomerBankAccount",
        customerId,
        nameOnAccount,
        routingNumber,
        accountNumber,
        ...(additionalFields || {}),
      },
      agreedWithTOS,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Create/CustomerBankAccount.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: createCustomerBankAccountInputs,
  examplePayload: createCustomerBankAccountExamplePayload,
});
