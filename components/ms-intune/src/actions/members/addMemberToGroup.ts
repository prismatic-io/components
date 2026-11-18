import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ADD_MEMBERS_RESPONSE_MESSAGE, ENDPOINTS } from "../../constants";
import { addMemberToGroupExamplePayload } from "../../examplePayloads";
import { addMemberToGroupInputs } from "../../inputs";
import { addMemberToGroupOutputSchema } from "../../outputSchemas";
import { addObjectTypeToMemberIds } from "../../util";

export const addMemberToGroup = action({
  display: {
    label: "Add Group Member",
    description: "Add a single member to a security or Microsoft 365 group.",
  },
  inputs: addMemberToGroupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addMemberToGroupOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId, memberId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.patch(`${ENDPOINTS.GROUPS}/${groupId}`, {
      "members@odata.bind": addObjectTypeToMemberIds([memberId]),
    });

    return {
      data: {
        message: ADD_MEMBERS_RESPONSE_MESSAGE,
      },
    };
  },
  examplePerform: async () => addMemberToGroupExamplePayload,
  examplePayload: addMemberToGroupExamplePayload,
});
