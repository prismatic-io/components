import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listInvoiceInputs } from "../../inputs/invoice";
import { listInvoicesExamplePayload } from "../../examplePayloads";

export const listInvoice = action({
  display: {
    label: "List Invoices",
    description: "List invoice objects.",
  },
  perform: async (
    context,
    { connection, filters, sort, start, max, nested },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      start,
      max,
      filters,
      sort,
      nested,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post("/List/Invoice.json", stringifiedData);

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: listInvoiceInputs,
  examplePayload: listInvoicesExamplePayload,
});
