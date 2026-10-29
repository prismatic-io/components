import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, accountId } from "../inputs";
import { getAccountPayload } from "../examplePayloads";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieves the account information for the specified account.",
  },
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.get(`/${accountId}`);
    return { data };
  },
  inputs: {
    connection,
    accountId,
  },
  examplePayload: getAccountPayload,
});
