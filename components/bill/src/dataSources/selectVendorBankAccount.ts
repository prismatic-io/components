import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectVendorBankAccountInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, BANK_ACCOUNT_LIST_ENDPOINTS } from "../constants";
export const selectVendorBankAccount = dataSource({
  display: {
    label: "Select Vendor Bank Account",
    description:
      "Select a vendor bank account from the list of available vendor bank accounts.",
  },
  inputs: selectVendorBankAccountInputs,
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
      BANK_ACCOUNT_LIST_ENDPOINTS.vendorBankAccount,
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        nameOnAcct: string;
      }[]
    ).map<Element>((vendorBankAccount) => ({
      key: vendorBankAccount.id,
      label: vendorBankAccount.nameOnAcct,
    }));
    return { result: objects };
  },
});
