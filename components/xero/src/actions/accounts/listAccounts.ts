import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { connectionInput, modifiedAfter, where } from "../../inputs";
import { listAccountsExamplePayload } from "../../examplePayloads";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "List all accounts",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/accounts", {
      headers: {
        "If-Modified-Since": util.types.toString(params.modifiedAfter),
      },
      params: {
        where: util.types.toString(params.where) || undefined,
      },
    });
    return { data };
  },
  inputs: { xeroConnection: connectionInput, modifiedAfter, where },

  examplePayload: listAccountsExamplePayload,
});
