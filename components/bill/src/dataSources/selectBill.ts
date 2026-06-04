import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";

export const selectBill = dataSource({
  display: {
    label: "Select Bill",
    description: "Select a bill from the list of available bills.",
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

    const { data } = await client.post("/List/Bill.json", stringifiedData);
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as { id: string; invoiceNumber: string }[]
    ).map<Element>((bill) => ({
      key: bill.id,
      label: bill.invoiceNumber,
    }));

    return { result: objects };
  },
});
