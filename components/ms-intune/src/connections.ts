import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";

export const msIntuneOAuth2 = oauth2Connection({
  key: "msIntuneOAuth2",
  oauth2Type: OAuth2Type.AuthorizationCode,
  display: {
    label: "OAuth 2.0",
    description: "OAuth 2.0 Connectivity for Microsoft Intune",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Microsoft Intune. For multi-tenant apps, use /common. For single-tenant apps, replace /common with your tenant ID.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Intune. For multi-tenant apps, use /common. For single-tenant apps, replace /common with your tenant ID.",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated list of Microsoft Graph API permission scopes. Common scopes include DeviceManagementManagedDevices, DeviceManagementApps, Directory, Group, User permissions. [Learn more](https://learn.microsoft.com/en-us/graph/permissions-reference)",
      default:
        "DeviceManagementManagedDevices.PrivilegedOperations.All DeviceManagementApps.ReadWrite.All DeviceManagementManagedDevices.ReadWrite.All Group.ReadWrite.All Domain.ReadWrite.All User.ReadWrite.All Directory.ReadWrite.All AuditLog.Read.All DeviceManagementConfiguration.ReadWrite.All offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Application (client) ID from your App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations > [Your App] to find this value. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client secret value from your App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations > [Your App] > Certificates & secrets to generate a new secret. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret)",
    },
  },
});

export const msIntuneClientCredentials = oauth2Connection({
  key: "oauth2-client-credentials",
  oauth2Type: OAuth2Type.ClientCredentials,
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "OAuth 2.0 Client Credentials Connectivity for Microsoft Intune",
  },
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Microsoft Intune. <strong>Important:</strong> Replace **<YOUR_TENANT_ID>** with your Azure AD tenant ID. Find your tenant ID in Azure Portal > Azure Active Directory > Overview.",
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
        "The scope for Microsoft Graph API access. For client credentials flow, use https://graph.microsoft.com/.default to request all permissions configured in your app registration. [Learn more](https://learn.microsoft.com/en-us/graph/auth-v2-service)",
      default: "https://graph.microsoft.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Application (client) ID from your App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations > [Your App] to find this value. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Client secret value from your App Registration in the Azure Portal. Navigate to Azure Active Directory > App registrations > [Your App] > Certificates & secrets to generate a new secret. [Learn more](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret)",
    },
  },
});

export default [msIntuneOAuth2, msIntuneClientCredentials];
