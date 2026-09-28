import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getTransactionExamplePayload } from "../../examplePayloads";
import { getTransactionInputs } from "../../inputs";
export const getTransaction = action({
  display: {
    label: "Get Transaction",
    description: "Loads a specified transaction.",
  },
  performSafety: "safe",
  perform: async (context, { connection, transactionId }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.transactions}/${encodeURIComponent(transactionId)}`,
    );
    return { data };
  },
  inputs: getTransactionInputs,
  examplePayload: getTransactionExamplePayload,
});
