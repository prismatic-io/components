import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { disableUserExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  email,
  on_behalf_of_user_id,
  version,
} from "../../inputs";

export const disableUser = action({
  display: {
    label: "Disable User",
    description: "Disables an existing user.",
  },
  perform: async (context, { connection, email, user_id, version }) => {
    const client = createClient(connection, version, context.debug.enabled);

    const newUser = {
      user: { email },
    };
    const { data } = await client.patch(`/users/disable`, newUser, {
      headers: {
        "On-Behalf-Of": user_id,
        contentType: "application/json",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version: { ...version, default: "v2" },
    user_id: on_behalf_of_user_id,
    email: { ...email, required: true },
  },
  examplePayload: disableUserExamplePayload,
});
