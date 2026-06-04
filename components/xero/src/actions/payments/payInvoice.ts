import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  invoiceId,
  accountId,
  paymentAmount,
  dateString,
  connectionInput,
} from "../../inputs";
import { payInvoiceExamplePayload } from "../../examplePayloads";

export const payInvoice = action({
  display: {
    label: "Pay Invoice",
    description: "Create a new payment on an existing AP/AR invoice",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/payments`, {
      Invoice: { InvoiceID: util.types.toString(params.invoiceId) },
      Account: { AccountID: util.types.toString(params.accountId) },
      Date: params.dateString,
      Amount: util.types.toNumber(params.paymentAmount) || undefined,
    });
    return { data };
  },
  inputs: {
    invoiceId,
    accountId,
    dateString,
    paymentAmount,
    xeroConnection: connectionInput,
  },
  examplePayload: payInvoiceExamplePayload,
});
