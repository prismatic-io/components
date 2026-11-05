import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateGroupExamplePayload } from "../../examplePayloads/groups";
import { updateGroupInputs } from "../../inputs/groups";
import type { Group } from "../../interfaces/group";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Updates profile information for an existing group.",
  },
  inputs: updateGroupInputs,
  perform: async (context, { connection, description, name, groupId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.put<Group>(`/groups/${encodeURIComponent(groupId)}`, {
      profile: {
        name,
        description,
      },
    });

    return { data };
  },
  examplePayload: updateGroupExamplePayload,
});
