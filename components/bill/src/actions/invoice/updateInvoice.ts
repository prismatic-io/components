import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { updateInvoiceInputs } from "../../inputs/invoice";
import { updateInvoiceExamplePayload } from "../../examplePayloads";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update an invoice object.",
  },
  perform: async (
    context,
    {
      connection,
      invoiceId,
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
        id: invoiceId,
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
      "/Crud/Update/Invoice.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: updateInvoiceInputs,
  examplePayload: updateInvoiceExamplePayload,
});
