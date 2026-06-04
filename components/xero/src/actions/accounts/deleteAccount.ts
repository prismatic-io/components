import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { accountId, connectionInput } from "../../inputs";
import { deleteAccountExamplePayload } from "../../examplePayloads";

export const deleteAccount = action({
  display: {
    label: "Delete Account",
    description: "Delete the information and metadata of an account by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/accounts/${params.accountId}`);
    return { data };
  },
  inputs: { accountId, xeroConnection: connectionInput },
  examplePayload: deleteAccountExamplePayload,
});
