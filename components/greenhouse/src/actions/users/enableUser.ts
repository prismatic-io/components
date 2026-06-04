import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { enableUserExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  email,
  on_behalf_of_user_id,
  version,
} from "../../inputs";

export const enableUser = action({
  display: {
    label: "Enable User",
    description: "Enables an existing user.",
  },
  perform: async (context, { connection, email, user_id, version }) => {
    const client = createClient(connection, version, context.debug.enabled);

    const newUser = {
      user: { email },
    };
    const { data } = await client.patch(`/users/enable`, newUser, {
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
  examplePayload: enableUserExamplePayload,
});
