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
      company,
      firstName,
      lastName,
      initials,
      locale,
      phone,
      title,
      email,
      isAccountAdmin,
      connection,
      accountId,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const userPayload: DetailedUserInfoPayload = {
      isAccountAdmin,
      email,
      company,
      firstName,
      lastName,
      initials,
      locale,
      phone,
      title,
      accountId,
    };

    const { data } = await client.post("/users", userPayload);
    return {
      data,
    };
  },
  examplePayload: createUserExamplePayload,
});
