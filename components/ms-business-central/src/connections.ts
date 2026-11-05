import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const businessCentralConnection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "businessCentralOauth2",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description: "Authenticate using OAuth 2.0 Authorization Code",
  },
  inputs: {
    webApiUrl: {
      label: "Web API URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Your organization's Microsoft Business Central Web API URL.",
      example: "https://api.businesscentral.dynamics.com/v2.0/<TENANT_DOMAIN>/<ENVIRONMENT>",
      placeholder: "https://api.businesscentral.dynamics.com/v2.0/<TENANT_DOMAIN>/<ENVIRONMENT>",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Microsoft Business Central.",
      default: "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Microsoft Business Central.",
      default: "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      example: "https://api.businesscentral.dynamics.com/.default offline_access",
      default: "https://api.businesscentral.dynamics.com/.default offline_access",
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from your Azure AD application registration. Found in Azure Portal > App registrations > Overview.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from your Azure AD application registration. Found in Azure Portal > App registrations > Certificates & secrets.",
    },
  },
});

export const businessClientCredentials = oauth2Connection({
  key: "businessCentralClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "Authenticate using OAuth 2.0 Client Credentials",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: {
    webApiUrl: {
      label: "Web API URL",
      type: "string",
      required: true,
      shown: true,
      comments: "Your organization's Microsoft Business Central Web API URL.",
      example: "https://api.businesscentral.dynamics.com/v2.0/<TENANT_DOMAIN>/<ENVIRONMENT>",
      placeholder: "https://api.businesscentral.dynamics.com/v2.0/<TENANT_DOMAIN>/<ENVIRONMENT>",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL. Found in Azure Portal > App registrations > Endpoints.",
      example:
        "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: true,
      shown: true,
      comments: "This should be your Business Central URL with '/.default' appended to it.",
      example: "https://api.businesscentral.dynamics.com/.default",
      default: "https://api.businesscentral.dynamics.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID generated when you register an app in Azure Portal. Found in App registrations > Overview.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret Value",
      placeholder: "Enter Client Secret Value",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret value from Azure Portal. Found in App registrations > Certificates & secrets.",
    },
  },
});

export default [businessCentralConnection, businessClientCredentials];
