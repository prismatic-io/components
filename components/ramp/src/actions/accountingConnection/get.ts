import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountingConnectionResponse } from "../../examplePayloads/accountingConnection";
import { connection } from "../../inputs";
import { getAccountConnectionOutputSchema } from "../../outputSchemas";
export const getAccountConnection = action({
  display: {
    label: "Get Accounting Connection",
    description: "Retrieve an existing accounting connection",
  },
  inputs: {
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAccountConnectionOutputSchema,
  }),
  performSafety: "safe",
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
