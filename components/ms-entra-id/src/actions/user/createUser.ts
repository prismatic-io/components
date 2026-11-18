import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserExamplePayload as examplePayload } from "../../examplePayloads";
import { createUserInputs as inputs } from "../../inputs/user";
import { createUserOutputSchema } from "../../outputSchemas";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  performSafety: "notAllowed",
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
    const { data } = await client.post(`/users`, payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { displayName, userPrincipalName, domain },
  ) => ({
    data: {
      ...examplePayload.data,
      displayName,
      userPrincipalName: `${userPrincipalName}@${domain}`,
    },
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createUserOutputSchema,
  }),
  examplePayload,
});
