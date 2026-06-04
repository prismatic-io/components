import { getMicrosoftOAuth2ClientCredentialsConnection } from "ms-utils";

export const msEntraIdClientCredentials =
  getMicrosoftOAuth2ClientCredentialsConnection({
    key: "msEntraIdClientCredentials",
    defaultScopes: "https://graph.microsoft.com/.default",
  });
