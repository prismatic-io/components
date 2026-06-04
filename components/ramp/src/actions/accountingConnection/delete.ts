import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { accountingConnectionId, connection } from "../../inputs";

export const deleteAccountConnection = action({
  display: {
    label: "Delete an Accounting Connection",
    description: "Delete an accounting connection",
  },
  inputs: {
    accountingConnectionId,
    connection,
  },
  perform: async (context, { connection, accountingConnectionId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/accounting/connection/${accountingConnectionId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
