import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupMembersExamplePayload as examplePayload } from "../../examplePayloads";
import { listGroupMembersInputs as inputs } from "../../inputs/group";
import { getConsistencyLevelHeader, getValues } from "../../util";
export const listGroupMembers = action({
  display: {
    label: "List Group Members",
    description: "Retrieves the direct members of a group.",
  },
  perform: async (
    context,
    {
      connection,
      groupId,
      odataQueryParams,
      getAllPaginatedResults,
      eventualConsistencyLevelHeader,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: odataQueryParams.$filter,
      $count: odataQueryParams.$count,
      $select: odataQueryParams.$select,
      $search: odataQueryParams.$search,
      $top: odataQueryParams.$top,
      $expand: odataQueryParams.$expand,
    };
    const { data } = await getValues(
      getAllPaginatedResults,
      client,
      `/groups/${groupId}/members`,
      {
        params,
        headers: getConsistencyLevelHeader(eventualConsistencyLevelHeader),
      },
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
