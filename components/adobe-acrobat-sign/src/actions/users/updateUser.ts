import { action } from "@prismatic-io/spectral";
import { updateUserInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { DetailedUserInfoPutPayload } from "../../types";
import { updateUserExamplePayload } from "../../examplePayloads";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a user in the Adobe Acrobat Sign system.",
  },
  inputs: updateUserInputs,
  perform: async (
    context,
    {
      company,
      firstName,
      lastName,
      initials,
      locale,
      phone,
      title,
      email,
      connection,
      userId,
      userStatus,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const userPayload: DetailedUserInfoPutPayload = {
      email,
      company,
      firstName,
      lastName,
      initials,
      locale,
      phone,
      title,
      status: userStatus,
    };

    const { data } = await client.put(`/users/${userId}`, userPayload);
    return {
      data,
    };
  },
  examplePayload: updateUserExamplePayload,
});
