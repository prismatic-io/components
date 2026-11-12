import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { deleteAccountInputs } from "../../inputs";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Closes the specified account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, accountId }) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/${accountId}`);
    return { data };
  },
  examplePerform: async () => deleteAccountExamplePayload,
  inputs: deleteAccountInputs,
  examplePayload: deleteAccountExamplePayload,
});
