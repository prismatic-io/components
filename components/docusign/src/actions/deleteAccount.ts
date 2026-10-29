import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, accountId } from "../inputs";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Closes the specified account.",
  },
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/${accountId}`);
    return { data };
  },
  inputs: {
    connection,
    accountId,
  },
});
