import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGroupExamplePayload } from "../../examplePayloads/groups";
import { getGroupInputs } from "../../inputs/groups";
import type { Group } from "../../interfaces/group";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieve a group by ID.",
  },
  inputs: getGroupInputs,
  perform: async (context, { connection, groupId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Group>(`/groups/${encodeURIComponent(groupId)}`);

    return { data };
  },
  examplePayload: getGroupExamplePayload,
});
