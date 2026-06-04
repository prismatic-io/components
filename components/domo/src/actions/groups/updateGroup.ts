import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateGroupInputs } from "../../inputs";
import type { UpdateGroupBody } from "../types/UpdateGroupBody";
import { updateGroupExamplePayload } from "../../examplePayloads";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Updates the specified group's attributes in a Domo instance.",
  },
  examplePayload: updateGroupExamplePayload,
  perform: async (context, { connection, groupId, updateGroupBody }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (updateGroupBody.length)
      body = JSON.parse(updateGroupBody) as UpdateGroupBody;
    const { data } = await client.put(`/groups/${groupId}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return { data };
  },
  inputs: updateGroupInputs,
});

export default { updateGroup };
