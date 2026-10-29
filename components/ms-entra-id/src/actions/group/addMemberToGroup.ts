import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { addMemberToGroupInputs as inputs } from "../../inputs/group";

export const addMemberToGroup = action({
  display: {
    label: "Add Member to Group",
    description: "Add a member to a group.",
  },
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
  inputs,
  examplePayload,
});
