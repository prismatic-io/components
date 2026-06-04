import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteAccountInputs } from "../../inputs";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Deletes an account from a Domo instance.",
  },
  examplePayload: deleteAccountExamplePayload,
  perform: async (context, { connection, accountId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/accounts/${accountId}`);
    return { data };
  },
  inputs: deleteAccountInputs,
});

export default { deleteAccount };
