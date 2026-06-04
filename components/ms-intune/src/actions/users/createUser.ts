import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import createUserInputs from "../../inputs/users/createUserInputs";
import { createUserExamplePayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  perform: async (
    context,
    {
      connection,
      accountEnabled,
      displayName,
      forceChangePasswordNextSignIn,
      password,
      userPrincipalName,
      domain,
      additionalProperties,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      accountEnabled,
      displayName,
      passwordProfile: {
        forceChangePasswordNextSignIn,
        password,
      },
      mailNickname: userPrincipalName,
      userPrincipalName: `${userPrincipalName}@${domain}`,
      ...(additionalProperties || {}),
    };
    const { data } = await client.post("/users", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createUserInputs,
  },
  examplePayload: createUserExamplePayload,
});
