import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { unlockUserExamplePayload } from "../../examplePayloads/users";
import { deactivateUserInputs as unlockUserInputs } from "../../inputs/users";

export const unlockUser = action({
  display: {
    label: "Unlock User",
    description: "Unlock a user by ID or login.",
  },
  inputs: unlockUserInputs,
  perform: async (context, { connection, id, sendEmail }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.post(`/users/${encodeURIComponent(id)}/lifecycle/unlock`, {
      sendEmail,
    });

    return {
      data: {
        id,
        status: "ACTIVE",
      },
    };
  },
  examplePayload: unlockUserExamplePayload,
});
