import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { deleteUserGroupMemberInputs } from "../../inputs";
import { deleteUserGroupMemberPayload } from "../../examplePayloads";

export const deleteUserGroupMember = action({
  display: {
    label: "Delete User Group Member",
    description: "Remove a user from a user group",
  },
  perform: async (context, { connection, groupId, memberId }) => {
    const client = getGuruClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}/members/${memberId}`);

    const data = {
      message: "User removed from group successfully",
      groupId,
      memberId,
    };

    return { data };
  },
  inputs: deleteUserGroupMemberInputs,
  examplePayload: deleteUserGroupMemberPayload,
});
