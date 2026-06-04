import { action } from "@prismatic-io/spectral";
import { addMemberToGroupInputs } from "../../inputs/members/add";
import { createClient } from "../../client";
import { ADD_MEMBERS_RESPONSE_MESSAGE } from "../../constants";
import { addObjectTypeToMemberIds } from "../../util";

export const addMemberToGroup = action({
  display: {
    label: "Add Group Member",
    description: "Add a single member to a security or Microsoft 365 group.",
  },
  inputs: addMemberToGroupInputs,
  perform: async (context, { connection, groupId, memberId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`/groups/${groupId}`, {
      "members@odata.bind": addObjectTypeToMemberIds([memberId]),
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
