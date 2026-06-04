import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { connection, generalLedgerAccountId } from "../../inputs";

export const deleteGeneralLedgerAccount = action({
  display: {
    label: "Delete General Ledger Account",
    description: "Delete a general ledger account",
  },
  inputs: {
    generalLedgerAccountId: {
      ...generalLedgerAccountId,
      comments: "The ID of the general ledger account to delete",
    },
    connection,
  },
  perform: async (context, { connection, generalLedgerAccountId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/accounting/accounts/${generalLedgerAccountId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
