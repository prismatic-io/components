import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { removeUserFromGroupExamplePayload } from "../../examplePayloads";
import { removeUserFromGroupInputs } from "../../inputs";

export const removeUserFromGroup = action({
  display: {
    label: "Remove User From Group",
    description: "Removes a user from a group in a Domo instance.",
  },
  examplePayload: removeUserFromGroupExamplePayload,
  perform: async (context, { connection, groupId, userId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/groups/${groupId}/users/${userId}`);
    return { data };
  },
  inputs: removeUserFromGroupInputs,
});

export default { removeUserFromGroup };
