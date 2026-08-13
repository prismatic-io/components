import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGeneralLedgerAccountResponse as updateGeneralLedgerAccountResponse } from "../../examplePayloads/ledgerAccounts";
import {
  code,
  connection,
  generalLedgerAccountId,
  name,
  reactivate,
  subsidiaries,
} from "../../inputs";
import { updateGeneralLedgerAccountOutputSchema } from "../../outputSchemas";
export const updateGeneralLedgerAccount = action({
  display: {
    label: "Update General Ledger Account",
    description: "Update an existing general ledger account",
  },
  inputs: {
    generalLedgerAccountId: {
      ...generalLedgerAccountId,
      comments: "The ID of the general ledger account to update",
    },
    code: {
      ...code,
      comments:
        "The code of the general ledger account; provide an empty string to reset the remote code.",
    },
    name: {
      ...name,
      comments: "Name of the general ledger account",
    },
    reactivate: {
      ...reactivate,
      comments: "Reactivate a deleted general ledger account",
    },
    subsidiaries: {
      ...subsidiaries,
      comments:
        "IDs of a list of subsidiaries which a general ledger account can be used with. The Ramp-assigned IDs should be used here. Provide an empty list to reset the subsidiaries list for this general ledger account.",
    },
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateGeneralLedgerAccountOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      generalLedgerAccountId,
      code,
      name,
      reactivate,
      subsidiaries,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(
      `/accounting/accounts/${generalLedgerAccountId}`,
      {
        code,
        name,
        reactivate,
        subsidiaries,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { code, name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateGeneralLedgerAccountResponse,
      code: code ?? updateGeneralLedgerAccountResponse.code,
      name: name ?? updateGeneralLedgerAccountResponse.name,
    },
  }),
  examplePayload: {
    data: updateGeneralLedgerAccountResponse,
  },
});
