import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";

export const selectVendorBankAccount = dataSource({
  display: {
    label: "Select Vendor Bank Account",
    description:
      "Select a vendor bank account from the list of available vendor bank accounts.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const { client, loginData } = await getClient(connection, false);

    const sendData = {
      start: 0,
      max: 999,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/List/VendorBankAccount.json",
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as { id: string; nameOnAcct: string }[]
    ).map<Element>((vendorBankAccount) => ({
      key: vendorBankAccount.id,
      label: vendorBankAccount.nameOnAcct,
    }));

    return { result: objects };
  },
});
