import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an invoice from the list of available invoices.",
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

    const { data } = await client.post("/List/Invoice.json", stringifiedData);
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as { id: string; invoiceNumber: string }[]
    ).map<Element>((invoice) => ({
      key: invoice.id,
      label: invoice.invoiceNumber,
    }));

    return { result: objects };
  },
});
