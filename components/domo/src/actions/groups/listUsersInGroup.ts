import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listUsersInGroupExamplePayload } from "../../examplePayloads";
import { listUsersInGroupInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
import type { ListUsersInGroupQueryParams } from "../types/ListUsersInGroupQueryParams";

export const listUsersInGroup = action({
  display: {
    label: "List Users In Group",
    description: "Lists the users in a group in a Domo instance.",
  },
  examplePayload: listUsersInGroupExamplePayload,
  perform: async (context, { connection, groupId, pagination, fetchAll }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ListUsersInGroupQueryParams = {};
    if (pagination.limit.length) queryParams.limit = pagination.limit;
    if (pagination.offset.length) queryParams.offset = pagination.offset;
    return await paginateResults(
      client,
      `/groups/${groupId}/users`,
      fetchAll,
      queryParams as Record<string, string>,
    );
  },
  inputs: listUsersInGroupInputs,
});

export default { listUsersInGroup };
