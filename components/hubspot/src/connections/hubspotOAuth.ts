import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { BASE_URL } from "../constants";
export const hubspotOAuth = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests to HubSpot using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for HubSpot. Optional scopes can be appended to the URL.",
      example:
        "https://app.hubspot.com/oauth/authorize?optional_scope=crm.lists.read content",
      default: "https://app.hubspot.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for HubSpot.",
      default: `${BASE_URL}/oauth/v3/token`,
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes (space-separated)",
      type: "string",
      required: true,
      shown: true,
      comments:
        "OAuth permission scopes. See [HubSpot scopes](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/scopes) for available scopes.",
      example: "crm.objects.contacts.read crm.objects.deals.read",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the HubSpot app. Found in HubSpot Developer Account > Apps > Auth.",
      example: "12345678-1234-1234-1234-123456789abc",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the HubSpot app. Keep this value secure.",
    },
    appId: {
      label: "App ID",
      placeholder: "Enter App ID",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The App ID from the HubSpot Developer Console. Required for Webhooks.",
      example: "123456",
    },
    developerApiKey: {
      label: "Developer API Key",
      placeholder: "Enter Developer API Key",
      type: "password",
      required: false,
      shown: true,
      comments:
        "The Developer API Key from the HubSpot Developer Console. Required for Webhooks.",
    },
  },
});
