import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listCustomerBankAccountInputs } from "../../inputs/customer";
import { listCustomerBankAccountExamplePayload } from "../../examplePayloads";
import { BANK_ACCOUNT_LIST_ENDPOINTS } from "../../constants";
export const listCustomerBankAccount = action({
  display: {
    label: "List Customer Bank Account",
    description: "List customer bank account objects.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, filters, sort, start, max, nested },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const sendData = {
      start,
      max,
      filters,
      sort,
      nested,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });
    const { data } = await client.post(
      BANK_ACCOUNT_LIST_ENDPOINTS.customerBankAccount,
      stringifiedData,
    );
    return {
      data: cleanReturnData(data),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listCustomerBankAccountExamplePayload.data,
  }),
  inputs: listCustomerBankAccountInputs,
  examplePayload: listCustomerBankAccountExamplePayload,
});
