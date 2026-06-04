import { getAtlassianOAuth2AuthorizationCodeConnection } from "atlassian-utils";
import { DEFAULT_OAUTH2_SCOPES } from "../constants";

export const jsmOAuth2 = getAtlassianOAuth2AuthorizationCodeConnection({
  key: "jsmOAuth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  defaultScopes: DEFAULT_OAUTH2_SCOPES.join(" "),
  comments: {
    authorizeUrl:
      "The OAuth 2.0 Authorization URL for Atlassian. The audience parameter is required for cloud APIs.",
    tokenUrl: "The OAuth 2.0 Token URL for Atlassian.",
    scopes:
      "Space-delimited list of OAuth 2.0 scopes for Jira Service Management access.",
    clientId: "OAuth 2.0 Client ID from the Atlassian Developer Console.",
    clientSecret:
      "OAuth 2.0 Client Secret from the Atlassian Developer Console.",
    apiSiteOverride:
      "Optional Atlassian site name or URL to connect to. By default, connects to the first accessible site. Set this when the authenticated account has access to multiple Jira sites.",
  },
});
