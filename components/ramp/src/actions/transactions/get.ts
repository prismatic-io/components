import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTransactionResponse } from "../../examplePayloads/transactions";
import { connection, transactionId } from "../../inputs";
import { getTransactionOutputSchema } from "../../outputSchemas";
export const getTransaction = action({
  display: {
    label: "Get Transaction",
    description: "Retrieve a transaction by ID",
  },
  inputs: {
    transactionId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTransactionOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, transactionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/transactions/${transactionId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getTransactionResponse,
  },
});
