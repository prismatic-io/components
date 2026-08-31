import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectCustomerBankAccountInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, BANK_ACCOUNT_LIST_ENDPOINTS } from "../constants";
export const selectCustomerBankAccount = dataSource({
  display: {
    label: "Select Customer Bank Account",
    description:
      "Select a customer bank account from the list of available customer bank accounts.",
  },
  inputs: selectCustomerBankAccountInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const { client, loginData } = await getClient(connection, false);
    const sendData = {
      start: 0,
      max: PAGE_SIZE,
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
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        nameOnAccount: string;
      }[]
    ).map<Element>((customerBankAccount) => ({
      key: customerBankAccount.id,
      label: customerBankAccount.nameOnAccount,
    }));
    return { result: objects };
  },
});
