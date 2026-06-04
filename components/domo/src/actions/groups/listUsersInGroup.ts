import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listUsersInGroupInputs } from "../../inputs";
import type { ListUsersInGroupQueryParams } from "../types/ListUsersInGroupQueryParams";
import { listUsersInGroupExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../utils/pagination";

export const listUsersInGroup = action({
  display: {
    label: "List Users In Group",
    description: "Lists the users in a group in a Domo instance.",
  },
  examplePayload: listUsersInGroupExamplePayload,
  perform: async (
    context,
    { connection, groupId, limit, offset, fetchAll },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListUsersInGroupQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    return paginateResults(
      client,
      `/groups/${groupId}/users`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listUsersInGroupInputs,
});

export default { listUsersInGroup };
