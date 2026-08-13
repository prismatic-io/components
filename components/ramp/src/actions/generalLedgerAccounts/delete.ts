import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { connection, generalLedgerAccountId } from "../../inputs";
import { deleteGeneralLedgerAccountOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteGeneralLedgerAccountOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, generalLedgerAccountId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/accounting/accounts/${generalLedgerAccountId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: GENERIC_DELETE_RESPONSE,
  }),
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
