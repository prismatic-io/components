import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { removeMemberOfGroupInputs as inputs } from "../../inputs/group";

export const removeMemberOfGroup = action({
  display: {
    label: "Remove Member From Group",
    description:
      "Removes a member from a Microsoft 365 group or a security group.",
  },
  perform: async (context, { connection, groupId, memberId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/groups/${groupId}/members/${memberId}/$ref`);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});
