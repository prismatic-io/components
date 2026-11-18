import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteGroupExamplePayload } from "../../examplePayloads";
import { deleteGroupInputs } from "../../inputs";
import { deleteGroupOutputSchema } from "../../outputSchemas";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Delete a single group.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.GROUPS}/${groupId}`);

    return {
      data: {
        success: true,
        id: groupId,
        message: "Group deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteGroupExamplePayload,
  inputs: deleteGroupInputs,
  examplePayload: deleteGroupExamplePayload,
});
