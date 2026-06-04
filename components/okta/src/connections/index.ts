import {
  connection,
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

export const oktaOAuth2AuthorizationCode = oauth2Connection({
  key: "oktaOAuth2AuthorizationCode",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: templateConnectionInputs(
    {
      oktaDomainUrl: {
        label: "Okta Domain",
        placeholder: "Enter Okta domain",
        example: "your-org.okta.com",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The base URL for the Okta API. Depending on your cloud environment, you can choose the correct one [here](https://developer.okta.com/docs/reference/api-overview/).",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Enter scopes",
        type: "string",
        required: false,
        shown: true,
        comments: "Okta API permission scopes are set on the OAuth application.",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          "Client Id of your Okta's application. [Learn more](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/)",
        example: "11111111-2222-3333-4444-555555555555",
      },
      clientSecret: {
        label: "Client secret value",
        placeholder: "Enter Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments:
          "Client Secret generated in your Okta's application. [Learn more](https://developer.okta.com/docs/guides/implement-grant-type/authcode/main/).",
        example: "11111111-2222-3333-4444-555555555555",
      },
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Enter Authorize URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Authorization URL for Okta's API.",
        example: "https://{{#oktaDomainUrl}}/oauth2/v1/authorize",
        templateValue: "https://{{#oktaDomainUrl}}/oauth2/v1/authorize",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter Token URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Token URL for Okta's API.",
        example: "https://{{#oktaDomainUrl}}/oauth2/v1/token",
        templateValue: "https://{{#oktaDomainUrl}}/oauth2/v1/token",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export const oktaClientCredentialsOrg = connection({
  key: "oktaClientCredentialsOrg",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate using OAuth 2.0 Client Credentials with private_key_jwt method",
  },
  comments:
    "Authenticate using OAuth 2.0 Client Credentials with private_key_jwt method to access Okta's APIs. This is the ONLY supported authentication method for Okta service apps accessing Okta scopes.",
  inputs: {
    oktaDomainUrl: {
      label: "Okta Domain",
      placeholder: "Enter Okta domain",
      example: "your-org.okta.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Okta API. Depending on your cloud environment, you can choose the correct one [here](https://developer.okta.com/docs/reference/api-overview/).",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Client Id of your Okta service application. The application must have the appropriate OAuth 2.0 scopes granted and admin roles assigned. [Learn more](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/)",
      example: "0oa1234567abcdefg890",
    },
    privateKey: {
      label: "Private Key (PEM format)",
      placeholder: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
      type: "text",
      required: true,
      shown: true,
      comments:
        "The private key in PEM format used to sign the JWT assertion. Generate a key pair and register the public key with your Okta service app. [Learn more](https://developer.okta.com/docs/guides/implement-oauth-for-okta-serviceapp/main/#create-and-register-a-public-private-key-pair)",
    },
    scopes: {
      label: "Scopes",
      placeholder: "okta.users.read okta.groups.read",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Space-separated list of Okta API permission scopes. Common scopes include okta.users.read, okta.users.manage, okta.groups.read, okta.groups.manage, okta.apps.read, etc. [Learn more](https://developer.okta.com/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints)",
    },
  },
});

export const oktaApiTokenConnection = connection({
  key: "oktaApiTokenConnection",
  display: {
    label: "API Token",
    description: "Authenticate using an API token",
  },
  comments: "Authenticate using an API token from your Okta Admin Console",
  inputs: {
    oktaDomainUrl: {
      label: "Okta Domain",
      placeholder: "Enter Okta domain",
      example: "your-org.okta.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Okta API. Depending on your cloud environment, you can choose the correct one [here](https://developer.okta.com/docs/reference/api-overview/).",
    },
    apiToken: {
      label: "API Token",
      placeholder: "Enter API token",
      type: "password",
      required: true,
      comments:
        "API Token generated in your Okta Admin Console. [Learn more](https://developer.okta.com/docs/guides/create-an-api-token/main/).",
    },
  },
});

export default [oktaOAuth2AuthorizationCode, oktaClientCredentialsOrg, oktaApiTokenConnection];
