import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listAccountsInputs } from "../../inputs";
import type { ListAccountsQueryParams } from "../types/ListAccountsQueryParams";
import { listAccountsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description:
      "Lists all accounts the authenticated user has permissions for.",
  },
  examplePayload: listAccountsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListAccountsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(client, "/accounts", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listAccountsInputs,
});

export default { listAccounts };
