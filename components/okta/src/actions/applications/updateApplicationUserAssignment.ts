import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateApplicationUserAssignmentsExamplePayload } from "../../examplePayloads/applications";
import { updateApplicationUserAssignmentsInputs } from "../../inputs/applications";

export const updateApplicationUserAssignment = action({
  display: {
    label: "Update Application User Assignment",
    description:
      "Updates the app-specific profile and credentials for a user's application assignment.",
  },
  inputs: updateApplicationUserAssignmentsInputs,
  perform: async (context, { connection, applicationId, userId, profile, username, password }) => {
    const client = await createClient(connection, context.debug.enabled);
    if (profile && (username || password)) {
      throw new Error("Either profile or username/password must be provided but not both.");
    }
    const { data } = await client.post(
      `/apps/${encodeURIComponent(applicationId)}/users/${encodeURIComponent(userId)}`,
      {
        profile,
        credentials:
          username || password
            ? {
                userName: username,
                password: password ? { value: password } : undefined,
              }
            : undefined,
      },
    );

    return { data };
  },
  examplePayload: updateApplicationUserAssignmentsExamplePayload,
});
