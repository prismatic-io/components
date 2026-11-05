import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { activateUserExamplePayload } from "../../examplePayloads/users";
import { deactivateUserInputs as activateUserInputs } from "../../inputs/users";

export const activateUser = action({
  display: {
    label: "Activate User",
    description: "Activate a user by ID or login.",
  },
  inputs: activateUserInputs,
  perform: async (context, { connection, id, sendEmail }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/users/${encodeURIComponent(id)}/lifecycle/activate`, {
      sendEmail,
    });

    return { data };
  },
  examplePayload: activateUserExamplePayload,
});
