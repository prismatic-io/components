import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ADD_MEMBERS_RESPONSE_MESSAGE, ENDPOINTS } from "../../constants";
import { addMembersToGroupExamplePayload } from "../../examplePayloads";
import { addMembersToGroupInputs } from "../../inputs";
import { addMembersToGroupOutputSchema } from "../../outputSchemas";
import { addObjectTypeToMemberIds, getMemberIds } from "../../util";

export const addMembersToGroup = action({
  display: {
    label: "Add Group Members",
    description: "Add members to a security or Microsoft 365 group.",
  },
  inputs: addMembersToGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addMembersToGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, groupId, memberIds, memberIdsString },
  ) => {
    const memberIdsToAdd = getMemberIds(memberIds, memberIdsString);
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`${ENDPOINTS.GROUPS}/${groupId}`, {
      "members@odata.bind": addObjectTypeToMemberIds(memberIdsToAdd),
    });

    return {
      data: {
        message: ADD_MEMBERS_RESPONSE_MESSAGE,
      },
    };
  },
  examplePerform: async () => addMembersToGroupExamplePayload,
  examplePayload: addMembersToGroupExamplePayload,
});
