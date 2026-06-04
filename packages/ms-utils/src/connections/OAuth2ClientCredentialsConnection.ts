import {
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";
import type { OAuth2Connection } from "../interfaces/ConnectionParams/AuthorizationCodeParams";
import type { ClientCredentialParams } from "../interfaces/ConnectionParams/ClientCredentialsParams";

const _getMicrosoftOAuth2ClientCredentialsConnection = ({
  key,
  defaultScopes,
  comments,
  additionalInputs,
}: ClientCredentialParams) =>
  oauth2Connection({
    key,
    oauth2Type: OAuth2Type.ClientCredentials,
    display: {
      label: "OAuth 2.0 Client Credentials",
      description:
        "Authenticates actions in all Microsoft's Graph API services.",
    },
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
            "The base URL for the Microsoft Graph API. Depending on your cloud environment, you can choose the correct one [here](https://learn.microsoft.com/en-us/graph/deployments#microsoft-graph-and-graph-explorer-service-root-endpoints).",
        },
        entraIdEndpoint: {
          label: "Microsoft Entra ID Endpoint",
          type: "string",
          required: true,
          shown: true,
          comments:
            "The Microsoft Entra ID endpoint for the Microsoft Graph API. You can find this in the Azure portal or [here](https://learn.microsoft.com/en-us/graph/deployments#app-registration-and-token-service-root-endpoints).",
          example: "https://login.microsoftonline.com",
          default: "https://login.microsoftonline.com",
          placeholder: "https://login.microsoftonline.com",
        },
        tenant: {
          label: "Tenant",
          type: "string",
          required: true,
          shown: true,
          comments:
            comments?.tenantId ||
            "The tenant ID or name for the Microsoft Graph API. This is the ID or name of the tenant that you are connecting to.",
          example: "11111111-2222-3333-4444-555555555555",
          placeholder: "11111111-2222-3333-4444-555555555555",
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
          label: "Client Secret",
          placeholder: "Client Secret",
          type: "password",
          required: true,
          shown: true,
          comments:
            comments?.clientSecret ||
            "Client Secret generated under 'Certificates & Secrets' in your Azure application.",
          example: "11111111-2222-3333-4444-555555555555",
        },
        scopes: {
          label: "Scopes",
          placeholder: "https://graph.microsoft.com/.default",
          type: "string",
          required: false,
          shown: true,
          comments: comments?.scopes || "Microsoft Graph API Scopes.",
          default: defaultScopes || "https://graph.microsoft.com/.default",
        },
        ...(additionalInputs || {}),
      },
      {
        tokenUrl: {
          label: "Token URL",
          placeholder: "Token URL",
          type: "template",
          required: true,
          shown: false,
          comments:
            comments?.tokenUrl ||
            "Provide a tenant specific OAuth 2.0 token endpoint.",
          templateValue: "{{#entraIdEndpoint}}/{{#tenant}}/oauth2/v2.0/token",
        },
      },
      OAuth2Type.ClientCredentials,
    ),
  });

export const getMicrosoftOAuth2ClientCredentialsConnection: (
  params: ClientCredentialParams,
) => OAuth2Connection = _getMicrosoftOAuth2ClientCredentialsConnection;
