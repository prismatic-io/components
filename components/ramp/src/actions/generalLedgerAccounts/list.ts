import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGeneralLedgerAccountsResponse } from "../../examplePayloads/ledgerAccounts";
import { defaultListInputs } from "../../inputs";
import type { LedgerAccount } from "../../interfaces/ledgerAccount";
import { listGeneralLedgerAccountsOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listGeneralLedgerAccounts = action({
  display: {
    label: "List General Ledger Accounts",
    description: "Retrieve a list of all general ledger accounts",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGeneralLedgerAccountsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<LedgerAccount>(
      client,
      "/accounting/accounts",
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
      ...listGeneralLedgerAccountsResponse,
      page: fetchAll ? null : listGeneralLedgerAccountsResponse.page,
    },
  }),
  examplePayload: {
    data: listGeneralLedgerAccountsResponse,
  },
});
