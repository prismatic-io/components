import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountingConnectionResponse as createAccountingConnectionResponse } from "../../examplePayloads/accountingConnection";
import { connection, reactivate, remoteProviderName } from "../../inputs";

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
  examplePayload: {
    data: createAccountingConnectionResponse,
  },
});
