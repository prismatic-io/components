import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { resetUserPasswordExamplePayload } from "../../examplePayloads/users";
import { resetUserPasswordInputs } from "../../inputs/users";

export const resetUserPassword = action({
  display: {
    label: "Reset User Password",
    description: "Reset a user's password by ID or login.",
  },
  inputs: resetUserPasswordInputs,
  perform: async (context, { connection, id, sendEmail, revokeSessions }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/users/${encodeURIComponent(id)}/lifecycle/reset_password`,
      {
        sendEmail,
        revokeSessions,
      },
    );

    return { data };
  },
  examplePayload: resetUserPasswordExamplePayload,
});
