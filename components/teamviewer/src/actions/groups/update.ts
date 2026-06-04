import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateGroupInputs } from "../../inputs/groups";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Updates an existing group by its ID.",
  },
  perform: async (context, { connection, name, policy_id, groupId }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name,
      policy_id,
    };

    await client.put(`/groups/${groupId}`, body);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateGroupInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
