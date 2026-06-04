import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignUserToGroupExamplePayload } from "../../examplePayloads/groups";
import { assignApplicationToUserInputs } from "../../inputs/applications";

export const assignApplicationToUser = action({
  display: {
    label: "Assign Application to User",
    description: "Assigns an application to a user with app-specific profile and credentials.",
  },
  inputs: assignApplicationToUserInputs,
  perform: async (
    context,
    { applicationId, userId, connection, password, scope, username, profile },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/apps/${encodeURIComponent(applicationId)}/users`, {
      id: userId,
      scope,
      credentials: {
        userName: username,
        password: password ? { value: password } : undefined,
      },
      profile,
    });

    return { data };
  },
  examplePayload: assignUserToGroupExamplePayload,
});
