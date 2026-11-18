import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFUL_PAYLOAD } from "../../constants";
import { updateUserExamplePayload } from "../../examplePayloads";
import { updateUserInputs } from "../../inputs";
import { updateUserOutputSchema } from "../../outputSchemas";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update the properties of a User object.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      userId,
      userPrincipalName,
      domain,
      accountEnabled,
      displayName,
      name,
      jobTitle,
      additionalProperties,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

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
      givenName: name.givenName,
      surname: name.surname,
      jobTitle,
      ...(additionalProperties || {}),
    };
    await client.patch(`${ENDPOINTS.USERS}/${userId}`, payload);
    return {
      data: NO_RESPONSE_SUCCESSFUL_PAYLOAD,
    };
  },
  examplePerform: async () => updateUserExamplePayload,
  inputs: updateUserInputs,
  examplePayload: updateUserExamplePayload,
});
