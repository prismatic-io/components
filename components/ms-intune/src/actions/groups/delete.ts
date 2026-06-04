import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { deleteGroupInputs } from "../../inputs/groups/delete";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Delete a single group.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}`);

    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: {
    connection,
    ...deleteGroupInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
