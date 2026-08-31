import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectBillInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, RESOURCE_CONFIG } from "../constants";
export const selectBill = dataSource({
  display: {
    label: "Select Bill",
    description: "Select a bill from the list of available bills.",
  },
  inputs: selectBillInputs,
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
      RESOURCE_CONFIG.bills.endpoint,
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        invoiceNumber: string;
      }[]
    ).map<Element>((bill) => ({
      key: bill.id,
      label: bill.invoiceNumber,
    }));
    return { result: objects };
  },
});
