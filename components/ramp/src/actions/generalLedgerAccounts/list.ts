import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGeneralLedgerAccountsResponse } from "../../examplePayloads/ledgerAccounts";
import { defaultListInputs } from "../../inputs";
import type { LedgerAccount } from "../../interfaces/ledgerAccount";
import { fetchAllData } from "../../util";

export const listGeneralLedgerAccounts = action({
  display: {
    label: "List General Ledger Accounts",
    description: "Retrieve a list of all general ledger accounts",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<LedgerAccount>(
      client,
      "/accounting/accounts",
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
    data: listGeneralLedgerAccountsResponse,
  },
});
