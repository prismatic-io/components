import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createInvoiceInputs } from "../../inputs/invoice";
import { createInvoiceExamplePayload } from "../../examplePayloads";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create an invoice object.",
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      invoiceNumber,
      invoiceDate,
      dueDate,
      invoiceLineItems,
      additionalFields,
    },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        entity: "Invoice",
        customerId,
        invoiceNumber,
        invoiceDate,
        dueDate,
        invoiceLineItems,
        ...(additionalFields || {}),
      },
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Create/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: createInvoiceInputs,
  examplePayload: createInvoiceExamplePayload,
});
