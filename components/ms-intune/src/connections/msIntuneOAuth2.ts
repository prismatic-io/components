import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
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
