import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createGroupExamplePayload } from "../../examplePayloads";
import { createGroupInputs } from "../../inputs";
import { createGroupOutputSchema } from "../../outputSchemas";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Create a group.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createGroupOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createGroupExamplePayload,
  inputs: createGroupInputs,
  examplePayload: createGroupExamplePayload,
});
