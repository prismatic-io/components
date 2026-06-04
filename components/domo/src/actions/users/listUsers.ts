import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listUsersInputs } from "../../inputs";
import type { ListUsersQueryParams } from "../types/ListUsersQueryParams";
import { listUsersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Lists all users in a Domo instance.",
  },
  examplePayload: listUsersExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListUsersQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(client, "/users", fetchAll, queryParams as Record<string, string>);
  },
  inputs: listUsersInputs,
});

export default { listUsers };
