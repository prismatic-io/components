import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteMemberFromGroupExamplePayload } from "../../examplePayloads";
import { deleteMemberFromGroupInputs } from "../../inputs";
import { deleteMemberFromGroupOutputSchema } from "../../outputSchemas";

export const deleteMemberFromGroup = action({
  display: {
    label: "Delete Group Member",
    description: "Delete a member from a security or Microsoft 365 group.",
  },
  inputs: deleteMemberFromGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMemberFromGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { groupId, memberId, connection }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENDPOINTS.GROUPS}/${groupId}/members/${memberId}/$ref`,
    );

    return {
      data: {
        success: true,
        id: memberId,
        message: "Member removed from group successfully.",
      },
    };
  },
  examplePerform: async () => deleteMemberFromGroupExamplePayload,
  examplePayload: deleteMemberFromGroupExamplePayload,
});
