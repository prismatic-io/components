import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignUserToGroupExamplePayload } from "../../examplePayloads/groups";
import { addUserToGroupInputs } from "../../inputs/groups";

export const addUserToGroup = action({
  display: {
    label: "Add User to Group",
    description: "Add a user to a group.",
  },
  inputs: addUserToGroupInputs,
  perform: async (context, { groupId, userId, connection }) => {
    const client = await createClient(connection, context.debug.enabled);

    await client.put(`/groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`);

    return {
      data: {
        success: true,
        message: `User ${userId} added to group ${groupId}`,
      },
    };
  },
  examplePayload: assignUserToGroupExamplePayload,
});
