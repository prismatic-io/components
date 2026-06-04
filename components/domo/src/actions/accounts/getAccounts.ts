import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getAccountsInputs } from "../../inputs";
import { getAccountsExamplePayload } from "../../examplePayloads";

export const getAccounts = action({
  display: {
    label: "Get Accounts",
    description: "Retrieves the details of an account type.",
  },
  examplePayload: getAccountsExamplePayload,
  perform: async (context, { connection, accountTypeId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/account-types/${accountTypeId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getAccountsInputs,
});

export default { getAccounts };
