import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { activateUserExamplePayload as reactivateUserExamplePayload } from "../../examplePayloads/users";
import { deactivateUserInputs as reactivateUserInputs } from "../../inputs/users";

export const reactivateUser = action({
  display: {
    label: "Reactivate User",
    description: "Reactivate a user by ID or login.",
  },
  inputs: reactivateUserInputs,
  perform: async (context, { connection, id, sendEmail }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/users/${encodeURIComponent(id)}/lifecycle/reactivate`, {
      sendEmail,
    });

    return { data };
  },
  examplePayload: reactivateUserExamplePayload,
});
