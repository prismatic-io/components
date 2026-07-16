import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignApplicationToUserExamplePayload } from "../../examplePayloads/applications";
import { assignApplicationToUserInputs } from "../../inputs/applications";
export const assignApplicationToUser = action({
  display: {
    label: "Assign Application to User",
    description:
      "Assigns an application to a user with app-specific profile and credentials.",
  },
  inputs: assignApplicationToUserInputs,
  perform: async (
    context,
    { applicationId, userId, connection, scope, assignmentDetails = {} },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/apps/${encodeURIComponent(applicationId)}/users`,
      {
        id: userId,
        scope,
        credentials: {
          userName: assignmentDetails.username,
          password: assignmentDetails.password
            ? { value: assignmentDetails.password }
            : undefined,
        },
        profile: assignmentDetails.profile,
      },
    );
    return { data };
  },
  examplePayload: assignApplicationToUserExamplePayload,
});
