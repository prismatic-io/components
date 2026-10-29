import { action } from "@prismatic-io/spectral";
import { createAccountInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { createAccountExamplePayload } from "../../examplePayloads";

export const createAccount = action({
  display: {
    label: "Create Account",
    description:
      "Creates an Adobe Acrobat Sign account under the partner channel.",
  },
  inputs: createAccountInputs,
  perform: async (
    context,
    {
      accountType,
      connection,
      countryCode,
      email,
      numSeats,
      firstName,
      lastName,
      phone,
      additionalFields,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);
    const payload = {
      accountType,
      countryCode,
      numSeats,
      company: additionalFields.company,
      externalId: additionalFields.externalId,
      locale: additionalFields.locale,
      trialDuration: additionalFields.trialDuration,
      adminUserInfo: {
        email,
        firstName,
        lastName,
        locale: additionalFields.locale,
        phone,
        title: additionalFields.title,
      },
    };

    const { data } = await client.post("/accounts", payload);

    return { data };
  },
  examplePayload: createAccountExamplePayload,
});
