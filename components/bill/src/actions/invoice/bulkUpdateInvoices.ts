import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkUpdateInvoicesInputs } from "../../inputs/invoice";
import { bulkUpdateInvoicesExamplePayload } from "../../examplePayloads";

export const bulkUpdateInvoices = action({
  display: {
    label: "Bulk Update Invoices",
    description: "Bulk update invoice objects.",
  },
  perform: async (context, { connection, invoiceUpdateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: invoiceUpdateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Update/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkUpdateInvoicesInputs,
  examplePayload: bulkUpdateInvoicesExamplePayload,
});
