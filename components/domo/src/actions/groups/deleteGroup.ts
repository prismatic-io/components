import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteGroupExamplePayload } from "../../examplePayloads";
import { deleteGroupInputs } from "../../inputs";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Permanently deletes a group from a Domo instance.",
  },
  examplePayload: deleteGroupExamplePayload,
  perform: async (context, { connection, groupId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/groups/${groupId}`);
    return { data };
  },
  inputs: deleteGroupInputs,
});

export default { deleteGroup };
