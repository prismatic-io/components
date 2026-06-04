import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkCreateInvoicesInputs } from "../../inputs/invoice";
import { bulkCreateInvoicesExamplePayload } from "../../examplePayloads";

export const bulkCreateInvoices = action({
  display: {
    label: "Bulk Create Invoices",
    description: "Bulk create invoice objects.",
  },
  perform: async (context, { connection, invoiceCreateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = { bulk: invoiceCreateBulk };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Create/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkCreateInvoicesInputs,
  examplePayload: bulkCreateInvoicesExamplePayload,
});
