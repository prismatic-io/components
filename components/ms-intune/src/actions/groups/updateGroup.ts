import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { updateGroupExamplePayload } from "../../examplePayloads";
import { updateGroupInputs } from "../../inputs";
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
      additionalFields,
      displayName,
      mailNickname,
      securityEnabled,
      bodyFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`${ENDPOINTS.GROUPS}/${groupId}`, {
      assignedLabels: additionalFields.assignedLabels,
      description: additionalFields.description,
      displayName,
      mailNickname,
      securityEnabled,
      visibility: additionalFields.visibility,
      ...bodyFields,
    });
    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: updateGroupInputs,
  examplePayload: updateGroupExamplePayload,
});
