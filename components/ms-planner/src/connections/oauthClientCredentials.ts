import { getMicrosoftOAuth2ClientCredentialsConnection } from "ms-utils";
export const oauthClientCredentials =
  getMicrosoftOAuth2ClientCredentialsConnection({
    key: "oauthClientCredentials",
    additionalInputs: {
      userId: {
        label: "User ID",
        placeholder: "Enter User ID",
        type: "string",
        required: true,
        shown: true,
        example: "48d31887-5fad-4d73-a9f5-3c356e68a038",
        comments:
          "Object ID or user principal name of the user whose Planner data is accessed, found in the Microsoft Entra admin center under Users. Required because a client credentials token has no signed-in user, so every /me path is rewritten to /users/{User ID}.",
      },
    },
    comments: {
      tenantId:
        "Tenant ID or primary domain, found on the Overview page of the Microsoft Entra admin center. A client credentials token cannot be issued against the 'common' endpoint, so a specific tenant is required here.",
    },
  });
