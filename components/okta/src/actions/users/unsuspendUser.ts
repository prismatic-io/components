import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { unsuspendUserExamplePayload } from "../../examplePayloads/users";
import { suspendUserInputs as unsuspendUserInputs } from "../../inputs/users";

export const unsuspendUser = action({
  display: {
    label: "Unsuspend User",
    description: "Unsuspend a user by ID or login.",
  },
  inputs: unsuspendUserInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.post(`/users/${encodeURIComponent(id)}/lifecycle/unsuspend`);

    return {
      data: {
        id,
        status: "ACTIVE",
      },
    };
  },
  examplePayload: unsuspendUserExamplePayload,
});
