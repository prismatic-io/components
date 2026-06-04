import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { addUserGroupMemberInputs } from "../../inputs";
import { addUserGroupMemberPayload } from "../../examplePayloads";

export const addUserGroupMember = action({
  display: {
    label: "Add User Group Member",
    description: "Add a user group member",
  },
  perform: async (
    context,
    { connection, lastName, firstName, email, groupId },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = [
      {
        user: {
          lastName,
          firstName,
          email,
        },
      },
    ];

    const { data } = await client.post(
      `/groups/${groupId}/members`,
      requestBody,
    );

    return { data };
  },
  inputs: addUserGroupMemberInputs,
  examplePayload: addUserGroupMemberPayload,
});
