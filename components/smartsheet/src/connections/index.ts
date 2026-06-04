import {
  type ConnectionInput,
  connection,
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

const baseUrls = {
  commercial: {
    api: "https://api.smartsheet.com/2.0/",
    login: "https://app.smartsheet.com/b/authorize",
    token: "https://api.smartsheet.com/2.0/token",
  },
  government: {
    api: "https://api.smartsheetgov.com/2.0/",
    login: "https://app.smartsheetgov.com/b/authorize",
    token: "https://api.smartsheetgov.com/2.0/token",
  },
};


const baseUrl: ConnectionInput & { model: { label: string; value: string }[] } =
  {
    label: "Base URL",
    type: "string",
    default: baseUrls.commercial.api,
    comments:
      "Most applications use Smartsheet commercial. Government entities should select the government endpoint.",
    model: [
      {
        label: `Commercial - ${baseUrls.commercial.api}`,
        value: baseUrls.commercial.api,
      },
      {
        label: `Government - ${baseUrls.government.api}`,
        value: baseUrls.government.api,
      },
    ],
    required: true,
    shown: true,
  };

export const smartsheetOAuth2 = oauth2Connection({
  key: "Smartsheet OAuth2",
  display: {
    description:
      "Authenticate requests using OAuth 2.0. Deprecated in favor of the templated OAuth 2.0 connection.",
    label: "OAuth 2.0 (Deprecated)",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    baseUrl,
    authorizeUrl: {
      label: "Authorization URL",
      type: "string",
      required: true,
      shown: true,
      default: baseUrls.commercial.login,
      model: [
        {
          label: `Commercial - ${baseUrls.commercial.login}`,
          value: baseUrls.commercial.login,
        },
        {
          label: `Government - ${baseUrls.government.login}`,
          value: baseUrls.government.login,
        },
      ],
      comments: "The OAuth 2.0 authorization endpoint for Smartsheet.",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: true,
      default: baseUrls.commercial.token,
      model: [
        {
          label: `Commercial - ${baseUrls.commercial.token}`,
          value: baseUrls.commercial.token,
        },
        {
          label: `Government - ${baseUrls.government.token}`,
          value: baseUrls.government.token,
        },
      ],
      comments: "The OAuth 2.0 token exchange endpoint for Smartsheet.",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: true,
      shown: true,
      default:
        "ADMIN_SHEETS ADMIN_SIGHTS ADMIN_USERS ADMIN_WEBHOOKS ADMIN_WORKSPACES CREATE_SHEETS CREATE_SIGHTS DELETE_SHEETS DELETE_SIGHTS READ_CONTACTS READ_EVENTS READ_SHEETS READ_SIGHTS READ_USERS SHARE_SHEETS SHARE_SIGHTS WRITE_SHEETS",
      comments:
        "A space-separated list of permissions to request. Remove any permissions not needed. See [available scopes](https://developers.smartsheet.com/api/smartsheet/guides/advanced-topics/oauth) for details.",
    },
    clientId: {
      label: "App Client ID",
      type: "string",
      comments:
        "The client ID generated when creating an app within Smartsheet's Developer Tools.",
      example: "abcdefghijklmnop123",
      required: true,
      shown: true,
    },
    clientSecret: {
      label: "App Secret",
      type: "password",
      comments:
        "The client secret generated when creating an app within Smartsheet's Developer Tools.",
      example: "abcdefghijklmnop123",
      required: true,
      shown: true,
    },
  },
});

export const smartsheetApiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
  },
  inputs: {
    baseUrl,
    apiKey: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      shown: true,
      comments: "The API key generated from the Smartsheet account settings.",
    },
  },
});

export const smartsheetTemplatedOAuth = oauth2Connection({
  key: "templatedOAuth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate requests using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: templateConnectionInputs(
    {
      apiDomain: {
        label: "API Domain",
        type: "string",
        required: true,
        shown: true,
        model: [
          {
            label: "Commercial - api.smartsheet.com",
            value: "api.smartsheet.com",
          },
          {
            label: "Government - api.smartsheetgov.com",
            value: "api.smartsheetgov.com",
          },
        ],
        default: "api.smartsheet.com",
        comments:
          "Select the Smartsheet API domain. Most applications use commercial, but government entities should use the government endpoint.",
      } as ConnectionInput & { model: { label: string; value: string }[] },
      appDomain: {
        label: "App Domain",
        type: "string",
        required: true,
        shown: true,
        default: "app.smartsheet.com",
        model: [
          {
            label: "Commercial - app.smartsheet.com",
            value: "app.smartsheet.com",
          },
          {
            label: "Government - app.smartsheetgov.com",
            value: "app.smartsheetgov.com",
          },
        ],
        comments:
          "Select the Smartsheet application domain. This should match the API domain selection.",
      } as ConnectionInput & { model: { label: string; value: string }[] },
      scopes: {
        label: "Scopes",
        type: "string",
        required: false,
        shown: true,
        default:
          "ADMIN_SHEETS ADMIN_SIGHTS ADMIN_USERS ADMIN_WEBHOOKS ADMIN_WORKSPACES CREATE_SHEETS CREATE_SIGHTS DELETE_SHEETS DELETE_SIGHTS READ_CONTACTS READ_EVENTS READ_SHEETS READ_SIGHTS READ_USERS SHARE_SHEETS SHARE_SIGHTS WRITE_SHEETS",
        comments:
          "A space-separated list of permissions to request. Remove any permissions not needed. See [available scopes](https://developers.smartsheet.com/api/smartsheet/guides/advanced-topics/oauth) for details.",
      },
      clientId: {
        label: "App Client ID",
        type: "string",
        comments:
          "The client ID generated when creating an app within Smartsheet's Developer Tools.",
        example: "abcdefghijklmnop123",
        required: true,
        shown: true,
      },
      clientSecret: {
        label: "App Secret",
        type: "password",
        comments:
          "The client secret generated when creating an app within Smartsheet's Developer Tools.",
        example: "abcdefghijklmnop123",
        required: true,
        shown: true,
      },
    },
    {
      baseUrl: {
        label: "Base URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The base URL for the Smartsheet API",
        templateValue: "https://{{#apiDomain}}/2.0/",
      },
      authorizeUrl: {
        label: "Authorize URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Authorization URL for Smartsheet",
        templateValue: "https://{{#appDomain}}/b/authorize",
      },
      tokenUrl: {
        label: "Token URL",
        type: "template",
        required: true,
        shown: false,
        comments: "The OAuth 2.0 Token URL for Smartsheet",
        templateValue: "https://{{#apiDomain}}/2.0/token",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export default [smartsheetOAuth2, smartsheetApiKey, smartsheetTemplatedOAuth];
