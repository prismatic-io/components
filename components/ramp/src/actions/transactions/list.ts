import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTransactionsResponse } from "../../examplePayloads/transactions";
import { defaultListInputs } from "../../inputs";
import type { Transaction } from "../../interfaces/transactions";
import { listTransactionsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listTransactions = action({
  display: {
    label: "List Transactions",
    description: "Retrieve a list of all transactions",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTransactionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<Transaction>(
      client,
      "transactions",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listTransactionsResponse,
      page: fetchAll ? null : listTransactionsResponse.page,
    },
  }),
  examplePayload: {
    data: listTransactionsResponse,
  },
});
