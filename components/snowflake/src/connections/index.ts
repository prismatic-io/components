import { connection, OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { CONNECTION_KEY } from "../constants";

export const snowflakeOauthConnection = oauth2Connection({
  key: CONNECTION_KEY,
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for the Snowflake account. Format: https://[account-identifier].snowflakecomputing.com/oauth/authorize. [Learn more](https://docs.snowflake.com/en/user-guide/oauth-snowflake-overview)",
      example: "https://myorg-account123.snowflakecomputing.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for the Snowflake account. Format: https://[account-identifier].snowflakecomputing.com/oauth/token-request. [Learn more](https://docs.snowflake.com/en/user-guide/oauth-snowflake-overview)",
      example: "https://myorg-account123.snowflakecomputing.com/oauth/token-request",
    },
    scopes: {
      label: "Scopes",
      placeholder: "session:role:MYROLE",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Controls which Snowflake role is used during the session. Format: session:role:<ROLE_NAME>. If not specified, the user's default role is used. Space separate multiple scopes. [Learn more](https://docs.snowflake.com/en/user-guide/oauth-custom)",
      default: "",
      example: "session:role:SYSADMIN",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID of the Snowflake OAuth integration. Obtain this from the security integration configuration. [Learn more](https://docs.snowflake.com/en/user-guide/oauth-custom)",
      example: "AbCdEfGh123456",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret of the Snowflake OAuth integration. Generated when creating the security integration. [Learn more](https://docs.snowflake.com/en/user-guide/oauth-custom)",
    },
    headers: {
      label: "Headers",
      type: "string",
      collection: "keyvaluelist",
      required: false,
      shown: true,
      comments: "Additional headers to supply to authorization requests.",
    },
  },
});

export const snowflakeKeyPairConnection = connection({
  key: "snowflakeKeyPairConnection",
  display: {
    label: "Key Pair Authentication",
    description: "Authenticate using key pair authentication",
  },
  inputs: {
    privateKey: {
      label: "Private Key",
      placeholder: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
      type: "text",
      required: true,
      shown: true,
      comments:
        "The private key in PEM format for Snowflake Key Pair Authentication. Generate a key pair and register the public key with the Snowflake user. [Learn more](https://docs.snowflake.com/en/user-guide/key-pair-auth)",
    },
    username: {
      label: "Snowflake Username",
      placeholder: "Enter Snowflake username",
      type: "string",
      example: "MYUSER",
      required: true,
      shown: true,
      comments:
        "The Snowflake username for authentication. This is typically the login name in uppercase.",
    },
    accountIdentifier: {
      label: "Account Identifier",
      placeholder: "Enter Account Identifier",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Snowflake account identifier. Format: [organization]-[account]. Find this in the organization's account panel. [Learn more](https://docs.snowflake.com/en/user-guide/admin-account-identifier). For the JWT token generation, account identifiers need follow snowflake's [iss format requirements](https://docs.snowflake.com/en/developer-guide/sql-api/authenticating#using-key-pair-authentication).",
      example: "myorg-account123",
    },
    passphrase: {
      label: "Passphrase",
      placeholder: "Enter passphrase",
      type: "password",
      required: false,
      shown: true,
      comments:
        "The passphrase for the provided private key. Leave blank if the key is not encrypted.",
    },
  },
});

export default [snowflakeOauthConnection, snowflakeKeyPairConnection];
