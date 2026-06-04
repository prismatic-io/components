import {
  OAuth2Type,
  connection,
  oauth2Connection,
} from "@prismatic-io/spectral";

export const oauth = oauth2Connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description:
      "OAuth 2.0 Authorization Code Connectivity for Microsoft Teams",
  },
  label: "OAuth 2.0 Authorization Code",
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments: "OAuth 2.0 Authorization Code Connectivity for Microsoft Teams",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Authorization URL for Microsoft Teams",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Microsoft Teams",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Microsoft Teams permission scopes are set on the OAuth application",
      default:
        "https://graph.microsoft.com/Team.ReadBasic.All https://graph.microsoft.com/Team.Create https://graph.microsoft.com/Group.ReadWrite.All https://graph.microsoft.com/TeamMember.ReadWrite.All https://graph.microsoft.com/ChannelMessage.Read.All https://graph.microsoft.com/VirtualEvent.ReadWrite  offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client secret value",
      placeholder: "Client secret value",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const clientCredentials = oauth2Connection({
  key: "clientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "OAuth 2.0 Client Credentials Connectivity for Microsoft Teams",
  },
  label: "OAuth 2.0 Client Credentials",
  oauth2Type: OAuth2Type.ClientCredentials,
  comments: "OAuth 2.0 Client Credentials Connectivity for Microsoft Teams",
  inputs: {
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The OAuth 2.0 Token URL for Microsoft Teams",
      default: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: false,
      comments:
        "Microsoft Teams permission scopes are set on the OAuth application; defaults to using `.default` to automatically use all admin consented permissions on the app",
      default: "https://graph.microsoft.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client secret value",
      placeholder: "Client secret value",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export const webhook = connection({
  key: "webhook",
  display: {
    label: "Incoming Webhook",
    description: "Use Incoming Webhooks to send messages to Microsoft Teams.",
  },
  label: "Incoming Webhook",
  comments: "Use Incoming Webhooks to send messages",
  inputs: {
    webhookUrl: {
      label: "Webhook URL",
      placeholder: "Incoming Webhook URL",
      type: "string",
      required: true,
      comments: "The Incoming Webhook URL for a Teams channel.",
      example:
        "https://teamname.webhook.office.com/webhookb2/uuid/IncomingWebhook/uuid",
    },
  },
});

export const adminConsent = oauth2Connection({
  key: "adminConsent",
  display: {
    label: "OAuth 2.0 Admin Consent Client Credentials",
    description:
      "OAuth 2.0 Client Credentials Connectivity with admin consent screen for Microsoft Teams",
  },
  label: "OAuth 2.0 Admin Consent Client Credentials",
  oauth2Type: OAuth2Type.AuthorizationCode,
  comments:
    "OAuth 2.0 Client Credentials Connectivity with admin consent screen for Microsoft Teams",
  inputs: {
    authorizeUrl: {
      label: "Admin Consent URL",
      placeholder: "Admin Consent URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Replace {tenant} with the directory tenant that you want to request permission from",
      default: "https://login.microsoftonline.com/{tenant}/adminconsent",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Replace {tenant} with the directory tenant that you want to request permission from",
      default:
        "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token?grant_type=client_credentials",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Microsoft Teams permission scopes are set on the OAuth application; defaults to using `.default` to automatically use all admin consented permissions on the app",
      default: "https://graph.microsoft.com/.default",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "Client secret value",
      placeholder: "Client secret value",
      type: "password",
      required: true,
      shown: true,
    },
  },
});

export default [oauth, clientCredentials, webhook, adminConsent];
