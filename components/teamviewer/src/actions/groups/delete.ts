import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteGroupInputs } from "../../inputs/groups";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Deletes a group by its ID.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/groups/${groupId}`);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteGroupInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
