import { action } from "@prismatic-io/spectral";
import { addMembersToGroupInputs } from "../../inputs/members/add";
import { createClient } from "../../client";
import { ADD_MEMBERS_RESPONSE_MESSAGE } from "../../constants";
import { addObjectTypeToMemberIds, getMemberIds } from "../../util";

export const addMembersToGroup = action({
  display: {
    label: "Add Group Members",
    description: "Add members to a security or Microsoft 365 group.",
  },
  inputs: addMembersToGroupInputs,
  perform: async (
    context,
    { connection, groupId, memberIds, memberIdsString },
  ) => {
    const memberIdsToAdd = getMemberIds(memberIds, memberIdsString);
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`/groups/${groupId}`, {
      "members@odata.bind": addObjectTypeToMemberIds(memberIdsToAdd),
    });

    return {
      data: {
        message: ADD_MEMBERS_RESPONSE_MESSAGE,
      },
    };
  },
  examplePayload: {
    data: {
      message: ADD_MEMBERS_RESPONSE_MESSAGE,
    },
  },
});
