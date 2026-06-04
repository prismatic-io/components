import {
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";
import type {
  AuthorizationCodeParams,
  OAuth2Connection,
} from "../interfaces/ConnectionParams/AuthorizationCodeParams";

export const _getMicrosoftOAuth2AuthorizationCodeConnection = ({
  key,
  defaultScopes,
  comments,
  additionalInputs,
}: AuthorizationCodeParams): OAuth2Connection =>
  oauth2Connection({
    key,
    display: {
      label: "OAuth 2.0 Authorization Code",
      description:
        "Authenticates actions in all Microsoft's Graph API services.",
    },
    oauth2Type: OAuth2Type.AuthorizationCode,
    inputs: templateConnectionInputs(
      {
        baseUrl: {
          label: "Base URL",
          placeholder: "https://graph.microsoft.com",
          example: "https://graph.microsoft.com",
          default: "https://graph.microsoft.com",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.baseUrl ||
            "The base URL for the Microsoft Graph API. Depending on your cloud environment, you can choose the correct one [here](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
        },
        tenantUrl: {
          label: "Tenant URL",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.tenantUrl ||
            "The tenant URL for the Microsoft Graph API. This is the URL of the tenant that you are connecting to. You can find this in the Azure portal or [here](https://learn.microsoft.com/en-us/entra/identity-platform/authentication-national-cloud#microsoft-entra-authentication-endpoints).",
          example: "login.microsoftonline.com/common",
          default: "login.microsoftonline.com/common",
          placeholder: "login.microsoftonline.com/common",
        },
        scopes: {
          label: "Scopes",
          placeholder: "Scopes",
          type: "string",
          required: false,
          shown: true,
          comments:
            comments?.scopes ||
            "Microsoft Graph API permission scopes are set on the OAuth application.",
          default: defaultScopes || "offline_access",
        },
        clientId: {
          label: "Client ID",
          placeholder: "Client ID",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.clientId || "Client Id of your Azure application.",
          example: "11111111-2222-3333-4444-555555555555",
        },
        clientSecret: {
          label: "Client secret value",
          placeholder: "Client secret value",
          type: "password",
          required: true,
          shown: true,
          comments:
            comments?.clientSecret ||
            "Client Secret generated under 'Certificates & Secrets' in your Azure application.",
          example: "11111111-2222-3333-4444-555555555555",
        },
        extraParameters: {
          label: "Additional Authorization Parameters",
          type: "string",
          required: false,
          shown: true,
          example: "prompt=consent",
          placeholder: "Enter additional parameters for the authorization URL.",
          comments:
            comments?.extraParameters ||
            "Query string parameters to append to the OAuth authorization URL. Common parameters include `prompt=consent` to force the consent screen or `login_hint=user@example.com` to pre-fill the login email.",
        },
        ...(additionalInputs || {}),
      },
      {
        authorizeUrl: {
          label: "Authorize URL",
          placeholder: "Authorize URL",
          type: "template",
          required: true,
          shown: false,
          comments:
            comments?.authorizeUrl ||
            "The OAuth 2.0 Authorization URL for Microsoft's Graph API.",
          example: "login.microsoftonline.com/common",
          templateValue:
            "https://{{#tenantUrl}}/oauth2/v2.0/authorize?{{#extraParameters}}",
        },
        tokenUrl: {
          label: "Token URL",
          placeholder: "Token URL",
          type: "template",
          required: true,
          shown: false,
          comments:
            comments?.tokenUrl ||
            "The OAuth 2.0 Token URL for Microsoft's Graph API.",
          example: "login.microsoftonline.com/common",
          templateValue: "https://{{#tenantUrl}}/oauth2/v2.0/token",
        },
      },
      OAuth2Type.AuthorizationCode,
    ),
  });

export const getMicrosoftOAuth2AuthorizationCodeConnection: (
  params: AuthorizationCodeParams,
) => OAuth2Connection = _getMicrosoftOAuth2AuthorizationCodeConnection;
