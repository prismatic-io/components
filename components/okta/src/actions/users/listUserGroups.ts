import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUserGroupsExamplePayload } from "../../examplePayloads/users";
import { listUserGroupsInputs } from "../../inputs/users";

export const listUserGroups = action({
  display: {
    label: "List User Groups",
    description: "List groups for a specific user.",
  },
  inputs: listUserGroupsInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/users/${encodeURIComponent(id)}/groups`);

    return {
      data,
    };
  },
  examplePayload: listUserGroupsExamplePayload,
});
