import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createGroupExamplePayload } from "../../examplePayloads/groups";
import { createGroupInputs } from "../../inputs/groups";
import type { Group } from "../../interfaces/group";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Create a group in Okta.",
  },
  inputs: createGroupInputs,
  perform: async (context, { name, description, connection }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.post<Group>("/groups", {
      profile: {
        name,
        description,
      },
    });
    return { data };
  },
  examplePayload: createGroupExamplePayload,
});
