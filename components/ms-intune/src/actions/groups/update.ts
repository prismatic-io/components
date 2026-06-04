import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { updateGroupInputs } from "../../inputs/groups/update";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Update a single group.",
  },
  perform: async (
    context,
    {
      connection,
      groupId,
      assignedLabels,
      description,
      displayName,
      mailNickname,
      securityEnabled,
      visibility,
      bodyFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`/groups/${groupId}`, {
      assignedLabels,
      description,
      displayName,
      mailNickname,
      securityEnabled,
      visibility,
      ...bodyFields,
    });

    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: {
    connection,
    ...updateGroupInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
