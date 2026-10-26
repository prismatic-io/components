import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { paginateResults } from "../../util/pagination";
import { listInvoicesExamplePayload } from "../../examplePayloads";
import { listInvoicesInputs } from "../../inputs";
import { listInvoicesOutputSchema } from "../../outputSchemas";
export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "Retrieves all customer invoices and adjustments.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.customerAccounts}/invoices`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listInvoicesExamplePayload,
  inputs: listInvoicesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listInvoicesOutputSchema,
  }),
  examplePayload: listInvoicesExamplePayload,
});
