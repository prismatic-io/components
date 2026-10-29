import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteGroupExamplePayload } from "../../examplePayloads/groups";
import { getGroupInputs as deleteGroupInputs } from "../../inputs/groups";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Delete a group by ID.",
  },
  inputs: deleteGroupInputs,
  perform: async (context, { connection, groupId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${encodeURIComponent(groupId)}`);

    return {
      data: {
        id: groupId,
        status: "DELETED",
      },
    };
  },
  examplePayload: deleteGroupExamplePayload,
});
