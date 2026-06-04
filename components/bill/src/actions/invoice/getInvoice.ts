import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getInvoiceInputs } from "../../inputs/invoice";
import { getInvoiceExamplePayload } from "../../examplePayloads";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Read an invoice object.",
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
      "/Crud/Read/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getInvoiceInputs,
  examplePayload: getInvoiceExamplePayload,
});
