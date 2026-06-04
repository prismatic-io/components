import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteGroupInputs as inputs } from "../../inputs/group";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Deletes a group object.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}`);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});
