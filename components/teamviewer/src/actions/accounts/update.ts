import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateAccountInputs } from "../../inputs/accounts";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const updateAccount = action({
  display: {
    label: "Update Account",
    description: "Updates an account.",
  },
  perform: async (
    context,
    { connection, email, name, password, email_language, oldpassword },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    await client.put("/account", {
      email,
      name,
      password,
      email_language,
      oldpassword,
    });

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateAccountInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
