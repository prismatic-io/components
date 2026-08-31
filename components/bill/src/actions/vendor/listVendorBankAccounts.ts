import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listVendorBankAccountsInputs } from "../../inputs/vendor";
import { listVendorBankAccountsExamplePayload } from "../../examplePayloads";
import { BANK_ACCOUNT_LIST_ENDPOINTS } from "../../constants";
export const listVendorBankAccounts = action({
  display: {
    label: "List Vendor Bank Accounts",
    description: "List vendor bank account objects.",
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
      BANK_ACCOUNT_LIST_ENDPOINTS.vendorBankAccount,
      stringifiedData,
    );
    return {
      data: cleanReturnData(data),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listVendorBankAccountsExamplePayload.data,
  }),
  inputs: listVendorBankAccountsInputs,
  examplePayload: listVendorBankAccountsExamplePayload,
});
