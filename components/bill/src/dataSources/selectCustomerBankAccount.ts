import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";

export const selectCustomerBankAccount = dataSource({
  display: {
    label: "Select Customer Bank Account",
    description:
      "Select a customer bank account from the list of available customer bank accounts.",
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
      "/List/CustomerBankAccount.json",
      stringifiedData,
    );

    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as { id: string; nameOnAccount: string }[]
    ).map<Element>((customerBankAccount) => ({
      key: customerBankAccount.id,
      label: customerBankAccount.nameOnAccount,
    }));

    return { result: objects };
  },
});
