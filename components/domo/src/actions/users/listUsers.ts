import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListUsersQueryParams } from "../types/ListUsersQueryParams";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Lists all users in a Domo instance.",
  },
  examplePayload: listUsersExamplePayload,
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListUsersQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      "/users",
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listUsersInputs,
});

export default { listUsers };
