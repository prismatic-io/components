import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import type { OAuth2ClientCredentialsConnectionParams } from "../interfaces/ConnectionParams";

const DEFAULT_SCOPES =
  "read:jira-user read:jira-work write:jira-work manage:jira-project manage:jira-configuration manage:jira-webhook";

export const getAtlassianOAuth2ClientCredentialsConnection = ({
  key,
  display,
  defaultScopes,
  comments,
  additionalInputs,
}: OAuth2ClientCredentialsConnectionParams) =>
  oauth2Connection({
    oauth2Type: OAuth2Type.ClientCredentials,
    key,
    display: {
      label: display?.label || "OAuth 2.0 Client Credentials",
      description:
        display?.description ||
        "Authenticate with Atlassian using OAuth 2.0 Client Credentials for service account access",
    },
    inputs: {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter token URL",
        type: "string",
        required: true,
        shown: false,
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
          "Space-delimited list of OAuth scopes for Atlassian access. These must match the scopes configured when creating the OAuth 2.0 credential in Admin Hub. For more information, see [Atlassian OAuth 2.0 Scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.clientId ||
          "Your OAuth 2.0 Client ID generated when creating the credential in Atlassian Admin Hub.",
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
          "Your OAuth 2.0 Client Secret generated when creating the credential in Atlassian Admin Hub.",
        example:
          "ntDBx4ao5czkFu7Mzp5FTlYG0y3_ukxkSiPhwnTkhsdKHJITGRCGP3ZWlXTYyu",
      },
      cloudId: {
        label: "Cloud ID",
        placeholder: "Enter Cloud ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.cloudId ||
          "The Cloud ID of your Atlassian site. You can find this by following the instructions [here](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/).",
        example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
      ...(additionalInputs || {}),
    },
  });
