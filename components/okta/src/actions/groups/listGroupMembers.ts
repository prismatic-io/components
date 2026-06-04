import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupUsersExamplePayload } from "../../examplePayloads/groups";
import { listGroupUsersInputs } from "../../inputs/groups";
import { paginateRecordsWithLink } from "../../util/util";

export const listGroupMembers = action({
  display: {
    label: "List Group Members",
    description: "Retrieves all users who are members of the specified group.",
  },
  inputs: listGroupUsersInputs,
  perform: async (context, { after, connection, limit, groupId, fetchAll }) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink(
      client,
      `/groups/${encodeURIComponent(groupId)}/users`,
      fetchAll,
      {
        after,
        limit,
      },
    );

    return {
      data,
    };
  },
  examplePayload: listGroupUsersExamplePayload,
});
