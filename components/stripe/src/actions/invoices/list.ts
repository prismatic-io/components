import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listInvoicesExamplePayload } from "../../examplePayloads/invoices";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Return a list of invoices.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.invoices.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listInvoicesExamplePayload,
});
