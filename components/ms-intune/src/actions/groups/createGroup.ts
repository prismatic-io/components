import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getGroupExamplePayload as createGroupExamplePayload } from "../../examplePayloads";
import { createGroupInputs } from "../../inputs";
export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Create a group.",
  },
  perform: async (
    context,
    {
      connection,
      additionalFields,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      bodyFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(ENDPOINTS.GROUPS, {
      assignedLabels: additionalFields.assignedLabels,
      description: additionalFields.description,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      visibility: additionalFields.visibility,
      ...bodyFields,
    });
    return {
      data,
    };
  },
  inputs: createGroupInputs,
  examplePayload: createGroupExamplePayload,
});
