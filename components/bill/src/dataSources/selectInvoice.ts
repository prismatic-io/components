import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectInvoiceInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, RESOURCE_CONFIG } from "../constants";
export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an invoice from the list of available invoices.",
  },
  inputs: selectInvoiceInputs,
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
      RESOURCE_CONFIG.invoices.endpoint,
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        invoiceNumber: string;
      }[]
    ).map<Element>((invoice) => ({
      key: invoice.id,
      label: invoice.invoiceNumber,
    }));
    return { result: objects };
  },
});
