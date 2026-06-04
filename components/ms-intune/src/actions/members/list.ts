import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMembersInputs } from "../../inputs/members/list";
import { listMembersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listMembersFromGroup = action({
  display: {
    label: "List Group Members",
    description: "List all members of a security or Microsoft 365 group.",
  },
  inputs: listMembersInputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      groupId,
      $select,
      $filter,
      $search,
      $expand,
      $count,
      $top,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $select,
      $filter,
      $search,
      $expand,
      $count,
      $top,
    };

    const data = await paginateResults(
      client,
      `/groups/${groupId}/members`,
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  examplePayload: listMembersExamplePayload,
});
