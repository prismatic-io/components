import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAdAccountsResponse } from "../../examplePayloads";
import { listAdAccountsInputs } from "../../inputs";
import { getPaginatedData } from "../../util";
export const listAddAccounts = action({
  display: {
    label: "List Ad Accounts",
    description: "Get the ad accounts for the current user.",
  },
  perform: async (
    context,
    { version, connection, fetchAll, pagination, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await getPaginatedData(
      client,
      "/me/adaccounts",
      fetchAll,
      {
        limit: pagination.limit,
        before: pagination.before,
        after: pagination.after,
        fields,
      },
    );
    return {
      data,
    };
  },
  inputs: listAdAccountsInputs,
  examplePayload: listAdAccountsResponse,
});
