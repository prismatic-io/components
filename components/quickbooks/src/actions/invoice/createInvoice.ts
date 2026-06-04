import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, data } from "../../inputs";

export const createInvoice = action({
  display: {
    label: "Create Invoice (JSON)",
    description:
      "Create an invoice by providing a raw JSON payload matching the QuickBooks API schema.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.post("/invoice", params.data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      data: data.Invoice,
    };
  },
  inputs: { quickbooksConnection: connectionInput, data },
});
