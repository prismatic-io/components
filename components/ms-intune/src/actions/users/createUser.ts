import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUserInputs } from "../../inputs";
import { createUserOutputSchema } from "../../outputSchemas";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createUserOutputSchema,
  }),
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
    const { data } = await client.post(ENDPOINTS.USERS, payload);
    return {
      data,
    };
  },
  examplePerform: async () => createUserExamplePayload,
  inputs: createUserInputs,
  examplePayload: createUserExamplePayload,
});
