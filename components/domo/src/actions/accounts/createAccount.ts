import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createAccountInputs } from "../../inputs";
import type { CreateAccountBody } from "../types/CreateAccountBody";
import { createAccountExamplePayload } from "../../examplePayloads";

export const createAccount = action({
  display: {
    label: "Create Account",
    description:
      "Creates a new account in a Domo instance with the specified account type properties.",
  },
  examplePayload: createAccountExamplePayload,
  perform: async (
    context,
    { connection, name, id, password, authenticateBy, url, username },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreateAccountBody = {
      name,
      type: {
        id,
        properties: {
          password,
          authenticateBy,
          url,
          username,
        },
      },
    };
    const { data } = await client.post(`/accounts`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: createAccountInputs,
});

export default { createAccount };
