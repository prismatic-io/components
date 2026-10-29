import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listAccountsExamplePayload } from "../../examplePayloads";
import { listAccountsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListAccountsQueryParams } from "../types/ListAccountsQueryParams";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description:
      "Lists all accounts the authenticated user has permissions for.",
  },
  examplePayload: listAccountsExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListAccountsQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      "/accounts",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listAccountsInputs,
});

export default { listAccounts };
