import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listInvoicesExamplePayload } from "../../examplePayloads/invoices";
import { listInvoicesInputs } from "../../inputs";
import { listInvoicesOutputSchema } from "../../outputSchemas";
export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Return a list of invoices.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.invoices.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listInvoicesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listInvoicesOutputSchema,
  }),
  examplePayload: listInvoicesExamplePayload,
});
