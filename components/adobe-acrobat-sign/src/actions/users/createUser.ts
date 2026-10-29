import { action } from "@prismatic-io/spectral";
import { createUserInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { DetailedUserInfoPayload } from "../../types";
import { createUserExamplePayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a new user in the Adobe Acrobat Sign system.",
  },
  inputs: createUserInputs,
  perform: async (
    context,
    {
      firstName,
      lastName,
      email,
      phone,
      initials,
      isAccountAdmin,
      connection,
      additionalFields,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const userPayload: DetailedUserInfoPayload = {
      isAccountAdmin,
      email,
      company: additionalFields.company,
      firstName,
      lastName,
      initials,
      locale: additionalFields.locale,
      phone,
      title: additionalFields.title,
      accountId: additionalFields.accountId,
    };

    const { data } = await client.post("/users", userPayload);
    return {
      data,
    };
  },
  examplePayload: createUserExamplePayload,
});
