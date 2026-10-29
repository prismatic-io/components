import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { removeUserFromGroupExamplePayload } from "../../examplePayloads/groups";
import { removeUserFromGroupInputs } from "../../inputs/groups";

export const removeUserFromGroup = action({
  display: {
    label: "Remove User from Group",
    description: "Remove a user from a group.",
  },
  inputs: removeUserFromGroupInputs,
  perform: async (context, { groupId, userId, connection }) => {
    const client = await createClient(connection, context.debug.enabled);

    await client.delete(
      `/groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`,
    );

    return {
      data: {
        success: true,
        message: `User ${userId} removed from group ${groupId}`,
      },
    };
  },
  examplePayload: removeUserFromGroupExamplePayload,
});
