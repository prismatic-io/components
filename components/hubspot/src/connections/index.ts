import { connection, OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const baseUrl = "https://api.hubapi.com";

export const hubspotOAuth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests to Hubspot using OAuth 2.0.",
  },
  comments: "Authenticate requests to HubSpot using values obtained from the developer console.",
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for HubSpot. You can include optional scopes here.",
      example: "https://app.hubspot.com/oauth/authorize?optional_scope=crm.lists.read content",
      default: "https://app.hubspot.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for HubSpot.",
      default: `${baseUrl}/oauth/v3/token`,
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-separated)",
      type: "string",
      required: true,
      shown: true,
      comments:
        "OAuth permission scopes. See [HubSpot scopes](https://developers.hubspot.com/docs/api/oauth/scopes) for available scopes.",
      example: "crm.objects.contacts.read crm.objects.deals.read",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from your HubSpot app. Find this in HubSpot Developer Account > Apps > Auth.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from your HubSpot app. Keep this value secure.",
    },
    appId: {
      label: "App ID",
      placeholder: "Enter App ID",
      type: "string",
      required: false,
      shown: true,
      comments: "The App ID from the HubSpot Developer Console. Required for Webhooks.",
      example: "123456",
    },
    developerApiKey: {
      label: "Developer API Key",
      placeholder: "Enter Developer API Key",
      type: "password",
      required: false,
      shown: true,
      comments: "The Developer API Key from the HubSpot Developer Console. Required for Webhooks.",
    },
  },
});

export const privateAppAccessToken = connection({
  key: "privateAppAccessToken",
  display: {
    label: "Private App Access Token",
    description: "Authenticate requests to Hubspot using a private app access token.",
  },
  comments:
    "An access token generated when you create a private app. For testing purposes only - use OAuth 2.0 for production integrations.",
  inputs: {
    accessToken: {
      label: "Access Token",
      placeholder: "Enter Access Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "An access token generated when you create a private app. For testing purposes only - use OAuth 2.0 for production integrations.",
    },
  },
});

export const hubspotOAuthTrigger = connection({
  key: "hubspotOAuthTrigger",
  display: {
    label: "Webhook Authentication",
    description:
      "Authenticate HubSpot webhooks using Client Secret for signature verification only.",
  },
  comments: "Authenticate hubspot trigger with the client secret.",
  inputs: {
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from your HubSpot app, used to verify webhook signatures.",
    },
  },
});

export default [hubspotOAuth, privateAppAccessToken, hubspotOAuthTrigger];
