import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { clearUserSessionsExamplePayload } from "../../examplePayloads/users";
import { clearUserSessionsInputs } from "../../inputs/users";

export const clearUserSessions = action({
  display: {
    label: "Clear User Sessions",
    description: "Clears all active sessions for a user, forcing re-authentication on next access.",
  },
  inputs: clearUserSessionsInputs,
  perform: async (context, { connection, userId, forgetDevices, oauthTokens }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/users/${encodeURIComponent(userId)}/sessions`, {
      params: {
        forgetDevices,
        oauthTokens,
      },
    });

    return {
      data: {
        id: userId,
        status: "SESSIONS_CLEARED",
      },
    };
  },
  examplePayload: clearUserSessionsExamplePayload,
});
