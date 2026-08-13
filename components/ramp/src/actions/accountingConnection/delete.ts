import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { accountingConnectionId, connection } from "../../inputs";
import { deleteAccountConnectionOutputSchema } from "../../outputSchemas";
export const deleteAccountConnection = action({
  display: {
    label: "Delete Accounting Connection",
    description: "Delete an accounting connection",
  },
  inputs: {
    accountingConnectionId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAccountConnectionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, accountingConnectionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/accounting/connection/${accountingConnectionId}`);
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
