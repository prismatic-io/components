import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listInvoicesExamplePayload } from "../../examplePayloads";
import { listInvoicesInputs } from "../../inputs";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Retrieves all customer invoices and adjustments.",
  },
  perform: async (context, { connection, params }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.customerAccounts}/invoices`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listInvoicesInputs,
  examplePayload: listInvoicesExamplePayload,
});
