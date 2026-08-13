import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DELETE_MEMBERS_RESPONSE_MESSAGE, ENDPOINTS } from "../../constants";
import { deleteMemberFromGroupExamplePayload } from "../../examplePayloads";
import { deleteMemberInputs } from "../../inputs";
export const deleteMemberFromGroup = action({
  display: {
    label: "Delete Group Member",
    description: "Delete a member from a security or Microsoft 365 group.",
  },
  inputs: deleteMemberInputs,
  perform: async (context, { groupId, memberId, connection }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENDPOINTS.GROUPS}/${groupId}/members/${memberId}/$ref`,
    );
    return {
      data: DELETE_MEMBERS_RESPONSE_MESSAGE,
    };
  },
  examplePayload: deleteMemberFromGroupExamplePayload,
});
