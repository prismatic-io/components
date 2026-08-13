import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountingConnectionResponse as createAccountingConnectionResponse } from "../../examplePayloads/accountingConnection";
import { connection, reactivate, remoteProviderName } from "../../inputs";
import { createAccountingConnectionOutputSchema } from "../../outputSchemas";
export const createAccountingConnection = action({
  display: {
    label: "Create Accounting Connection",
    description: "Register a new accounting connection",
  },
  inputs: {
    remoteProviderName,
    reactivate: {
      ...reactivate,
      comments:
        "Set reactivate=True to try to find an existing deleted accounting connection instead of creating a new one",
    },
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAccountingConnectionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, reactivate, remoteProviderName }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/accounting/connection`, {
      reactivate,
      remote_provider_name: remoteProviderName,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { remoteProviderName },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createAccountingConnectionResponse,
      remote_provider_name: remoteProviderName,
    },
  }),
  examplePayload: {
    data: createAccountingConnectionResponse,
  },
});
