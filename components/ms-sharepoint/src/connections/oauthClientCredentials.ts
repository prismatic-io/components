import { ConnectionKeys, getMicrosoftOAuth2ClientCredentialsConnection } from "ms-utils";

export const oauthClientCredentials = getMicrosoftOAuth2ClientCredentialsConnection({
  key: ConnectionKeys.OauthClientCredentials,
});
