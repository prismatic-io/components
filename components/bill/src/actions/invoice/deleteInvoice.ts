import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { deleteInvoiceInputs } from "../../inputs/invoice";
import { deleteInvoiceExamplePayload } from "../../examplePayloads";

export const deleteInvoice = action({
  display: {
    label: "Delete Invoice",
    description: "Delete an invoice object.",
  },
  perform: async (context, { connection, invoiceId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = { id: invoiceId };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Delete/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: deleteInvoiceInputs,
  examplePayload: deleteInvoiceExamplePayload,
});
