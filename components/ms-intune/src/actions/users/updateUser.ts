import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import updateUserInputs from "../../inputs/users/updateUserInputs";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update the properties of a User object.",
  },
  perform: async (
    context,
    {
      connection,
      userId,
      userPrincipalName,
      domain,
      accountEnabled,
      displayName,
      givenName,
      surname,
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
      givenName,
      surname,
      jobTitle,
      ...(additionalProperties || {}),
    };
    const { data } = await client.patch(`/users/${userId}`, payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateUserInputs,
  },
  examplePayload: { data: {} },
});
