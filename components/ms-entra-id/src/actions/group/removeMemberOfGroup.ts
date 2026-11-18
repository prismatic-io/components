import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { removeMemberOfGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { removeMemberOfGroupInputs as inputs } from "../../inputs/group";
import { removeMemberOfGroupOutputSchema } from "../../outputSchemas";

export const removeMemberOfGroup = action({
  display: {
    label: "Remove Member From Group",
    description:
      "Removes a member from a Microsoft 365 group or a security group.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId, memberId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}/members/${memberId}/$ref`);
    return {
      data: {
        success: true,
        id: memberId,
        message: "Group member removed successfully",
      },
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeMemberOfGroupOutputSchema,
  }),
  examplePayload,
});
