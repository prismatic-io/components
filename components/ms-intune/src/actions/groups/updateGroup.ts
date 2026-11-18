import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { updateGroupExamplePayload } from "../../examplePayloads";
import { updateGroupInputs } from "../../inputs";
import { updateGroupOutputSchema } from "../../outputSchemas";

export const updateGroup = action({
  display: {
    label: "Update Group",
    description: "Update a single group.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateGroupOutputSchema,
  }),
  performSafety: "notAllowed",
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
      data: NO_RESPONSE_SUCCESSFUL_PAYLOAD,
    };
  },
  examplePerform: async () => updateGroupExamplePayload,
  inputs: updateGroupInputs,
  examplePayload: updateGroupExamplePayload,
});
