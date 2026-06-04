import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { addUserToGroupInputs } from "../../inputs";
import { addUserToGroupExamplePayload } from "../../examplePayloads";

export const addUserToGroup = action({
  display: {
    label: "Add User To Group",
    description: "Adds a user to a group in a Domo instance.",
  },
  examplePayload: addUserToGroupExamplePayload,
  perform: async (context, { connection, groupId, userId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/groups/${groupId}/users/${userId}`,
      undefined,
      { headers: { "Content-Type": "application/json" } },
    );
    return { data };
  },
  inputs: addUserToGroupInputs,
});

export default { addUserToGroup };
