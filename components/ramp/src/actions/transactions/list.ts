import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTransactionsResponse } from "../../examplePayloads/transactions";
import { defaultListInputs } from "../../inputs";
import type { Transaction } from "../../interfaces/transactions";
import { fetchAllData } from "../../util";

export const listTransactions = action({
  display: {
    label: "List Transactions",
    description: "Retrieve a list of all transactions",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<Transaction>(
      client,
      "transactions",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listTransactionsResponse,
  },
});
