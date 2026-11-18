import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteGroupInputs as inputs } from "../../inputs/group";
import { deleteGroupOutputSchema } from "../../outputSchemas";

export const deleteGroup = action({
  display: {
    label: "Delete Group",
    description: "Deletes a group object.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}`);
    return {
      data: {
        success: true,
        id: groupId,
        message: "Group deleted successfully",
      },
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteGroupOutputSchema,
  }),
  examplePayload,
});
