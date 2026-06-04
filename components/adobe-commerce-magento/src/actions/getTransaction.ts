import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { getTransactionExampleResponse } from "../examplePayloads";
import { connectionInput, transactionId } from "../inputs";

export const getTransaction = action({
  display: {
    label: "Get Transaction",
    description: "Loads a specified transaction.",
  },
  perform: async (context, { connection, transactionId }) => {
    const client = await getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(`/transactions/${transactionId}`);
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    transactionId,
  },
  examplePayload: getTransactionExampleResponse,
});

export default { getTransaction };
