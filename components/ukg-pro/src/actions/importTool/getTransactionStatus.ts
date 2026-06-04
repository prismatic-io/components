import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getTransactionStatusExamplePayload } from "../../examplePayloads";
import { getTransactionStatusInputs } from "../../inputs";







export const getTransactionStatus = action({
  display: {
    label: "Get Transaction Status",
    description: "Fetch the transaction name and status for an import tool transaction.",
  },
  inputs: getTransactionStatusInputs,
  perform: async (context, { connection }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await client.get("/personnel/v1/import-tool/status/transactionstatus/");

    return { data };
  },
  examplePayload: getTransactionStatusExamplePayload,
});
