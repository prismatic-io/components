import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { updateUserExamplePayload as examplePayload } from "../../examplePayloads";
import { updateUserInputs as inputs } from "../../inputs/user";
import { updateUserOutputSchema } from "../../outputSchemas";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update the properties of a User object.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, userId, userFields, additionalProperties },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const {
      userPrincipalName,
      domain,
      accountEnabled,
      displayName,
      givenName,
      surname,
      jobTitle,
    } = userFields;

    const lacksDomainWithPrincipalName = userPrincipalName && !domain;
    const lacksPrincipalNameWithDomain = !userPrincipalName && domain;

    const condition =
      lacksDomainWithPrincipalName || lacksPrincipalNameWithDomain;

    if (condition) {
      throw new Error(
        "'Domain' and 'User Principal Name' inputs must be provided together.",
      );
    }

    const userPrincipalNameProvided = userPrincipalName && domain;

    const updatedUserPrincipalName = userPrincipalNameProvided
      ? `${userPrincipalName}@${domain}`
      : undefined;

    const payload = {
      accountEnabled,
      displayName,
      userPrincipalName: updatedUserPrincipalName,
      givenName,
      surname,
      jobTitle,
      ...(additionalProperties || {}),
    };
    await client.patch(`/users/${userId}`, payload);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateUserOutputSchema,
  }),
  examplePayload,
});
