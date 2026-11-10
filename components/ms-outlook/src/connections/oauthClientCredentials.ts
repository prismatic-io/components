import { getMicrosoftOAuth2ClientCredentialsConnection } from "ms-utils";

export const oauthClientCredentials = getMicrosoftOAuth2ClientCredentialsConnection({
  key: "oauthClientCredentials",
  additionalInputs: {
    userId: {
      label: "User ID",
      placeholder: "Enter User ID",
      type: "string",
      required: true,
      shown: true,
      example: "user@example.com",
      comments:
        "The object ID or user principal name (for example, user@example.com) of the mailbox user whose data will be accessed. Find it under Users in the Microsoft Entra admin center. Required for client credentials authentication to work with user-specific endpoints.",
    },
  },
});
