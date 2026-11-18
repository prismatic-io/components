import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { addMemberToGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { addMemberToGroupInputs as inputs } from "../../inputs/group";
import { addMemberToGroupOutputSchema } from "../../outputSchemas";

export const addMemberToGroup = action({
  display: {
    label: "Add Member to Group",
    description: "Add a member to a group.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, groupId, groupMemberOdataId }) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      "@odata.id": groupMemberOdataId,
    };
    await client.post(`/groups/${groupId}/members/$ref`, payload);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addMemberToGroupOutputSchema,
  }),
  examplePayload,
});
