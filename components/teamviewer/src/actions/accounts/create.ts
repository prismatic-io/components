import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAccountExamplePayload } from "../../examplePayloads/account";
import { createAccountInputs } from "../../inputs/accounts";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Creates a new account.",
  },
  perform: async (
    context,
    { connection, email, language, name, password, client_id, client_secret },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      client_id,
      client_secret,
      email,
      language,
      name,
      password,
    };

    const { data } = await client.post("/account", body);

    return {
      data,
    };
  },
  inputs: createAccountInputs,
  examplePayload: createAccountExamplePayload,
});
