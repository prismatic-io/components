import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import type { OAuth2AuthorizationCodeConnectionParams } from "../interfaces/ConnectionParams";

const DEFAULT_SCOPES =
  "read:jira-user read:jira-work write:jira-work manage:jira-project manage:jira-configuration manage:jira-webhook offline_access";

export const getAtlassianOAuth2AuthorizationCodeConnection = ({
  key,
  display,
  defaultScopes,
  comments,
  additionalInputs,
}: OAuth2AuthorizationCodeConnectionParams) =>
  oauth2Connection({
    oauth2Type: OAuth2Type.AuthorizationCode,
    key,
    display: {
      label: display?.label || "OAuth 2.0",
      description:
        display?.description ||
        "Authenticate with Atlassian using OAuth 2.0 for secure access",
    },
    inputs: {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Enter authorize URL",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.authorizeUrl ||
          "The OAuth 2.0 Authorization URL for Atlassian.",
        default:
          "https://auth.atlassian.com/authorize?audience=api.atlassian.com&prompt=consent",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter token URL",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.tokenUrl || "The OAuth 2.0 Token URL for Atlassian.",
        default: "https://auth.atlassian.com/oauth/token",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Enter scopes",
        type: "string",
        required: true,
        shown: true,
        default: defaultScopes || DEFAULT_SCOPES,
        comments:
          comments?.scopes ||
          "Space-delimited list of OAuth scopes for Atlassian access. For more information, see [Atlassian OAuth 2.0 Scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.clientId ||
          "Your OAuth 2.0 Client ID from the Atlassian Developer Console.",
        example: "c9e4APadFFkbtTycoNtrHKBtYgUyZWy",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Enter Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments:
          comments?.clientSecret ||
          "Your OAuth 2.0 Client Secret from the Atlassian Developer Console.",
        example:
          "ntDBx4ao5czkFu7Mzp5FTlYG0y3_ukxkSiPhwnTkhsdKHJITGRCGP3ZWlXTYyu",
      },
      apiSiteOverride: {
        label: "Atlassian Site Name",
        placeholder: "Enter Atlassian site name",
        type: "string",
        required: false,
        shown: true,
        comments:
          comments?.apiSiteOverride ||
          "Optional site name or URL to connect to. By default, connects to the first Atlassian site the user has access to. Use this if you have multiple Atlassian sites.",
        example: "your-company.atlassian.net",
      },
      ...(additionalInputs || {}),
    },
  });
