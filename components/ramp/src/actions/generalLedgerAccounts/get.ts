import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGeneralLedgerAccountResponse } from "../../examplePayloads/ledgerAccounts";
import { connection, generalLedgerAccountId } from "../../inputs";
import { getGeneralLedgerAccountOutputSchema } from "../../outputSchemas";
export const getGeneralLedgerAccount = action({
  display: {
    label: "Get General Ledger Account",
    description: "Retrieve a general ledger account by ID",
  },
  inputs: {
    generalLedgerAccountId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getGeneralLedgerAccountOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, generalLedgerAccountId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/accounting/accounts/${generalLedgerAccountId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getGeneralLedgerAccountResponse,
  },
});
