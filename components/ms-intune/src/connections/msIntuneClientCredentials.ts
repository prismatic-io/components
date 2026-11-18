import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const msIntuneClientCredentials = oauth2Connection({
  key: "oauth2-client-credentials",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate requests to Microsoft Intune using OAuth 2.0 client credentials.",
  },
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Intune. <strong>Important:</strong> Replace **<YOUR_TENANT_ID>** with the Azure AD tenant ID. Find the tenant ID in Azure Portal > Azure Active Directory > Overview.",
      default:
        "https://login.microsoftonline.com/**<YOUR_TENANT_ID>**/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The scope for Microsoft Graph API access. For client credentials flow, use https://graph.microsoft.com/.default to request all permissions configured in the app registration. [Learn more](https://learn.microsoft.com/en-us/graph/auth-v2-service)",
      default: "https://graph.microsoft.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Application (client) ID from the App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations and open the app registration to find this value. [Learn more](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client secret value from the App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations, open the app registration, and go to Certificates & secrets to generate a new secret. [Learn more](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=client-secret)",
    },
  },
});
