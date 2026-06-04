import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { setUserPasswordExamplePayload } from "../../examplePayloads/users";
import { setUserPasswordInputs } from "../../inputs/users";

export const setUserPassword = action({
  display: {
    label: "Set User Password",
    description: "Set a user's password by ID or login.",
  },
  inputs: setUserPasswordInputs,
  perform: async (
    context,
    {
      connection,
      userId,
      revokeSessions,
      newHashPassword,
      newPassword,
      oldHashPassword,
      oldPassword,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/users/${encodeURIComponent(userId)}/lifecycle/reset_password`,
      {
        revokeSessions,
        newPassword: {
          value: newPassword,
          hash: newHashPassword,
        },
        oldPassword: {
          value: oldPassword,
          hash: oldHashPassword,
        },
      },
    );

    return { data };
  },
  examplePayload: setUserPasswordExamplePayload,
});
