import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountingConnectionResponse } from "../../examplePayloads/accountingConnection";
import { connection } from "../../inputs";

export const getAccountConnection = action({
  display: {
    label: "Get an Accounting Connection",
    description: "Retrieve an existing accounting connection",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/accounting/connection`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getAccountingConnectionResponse,
  },
});
