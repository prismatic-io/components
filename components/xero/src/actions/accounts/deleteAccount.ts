import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { deleteAccountInputs } from "../../inputs";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Delete an account by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/accounts/${params.accountId}`);
    return { data };
  },
  inputs: deleteAccountInputs,
  examplePayload: deleteAccountExamplePayload,
});
