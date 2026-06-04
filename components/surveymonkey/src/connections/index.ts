import {
  connection,
  oauth2Connection,
  OAuth2Type,
} from "@prismatic-io/spectral";

export const surveyMonkeyOAuth = oauth2Connection({
  key: "surveyMonkeyOAuth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    region: {
      label: "Region",
      placeholder: "Select region",
      type: "string",
      required: true,
      shown: true,
      default: "us",
      model: [
        { label: "United States", value: "us" },
        { label: "European Union", value: "eu" },
        { label: "Canada", value: "ca" },
      ],
      comments: "The SurveyMonkey region for the account.",
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.surveymonkey.com/oauth/authorize",
      comments: "The OAuth 2.0 Authorization URL for SurveyMonkey.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      default: "https://api.surveymonkey.com/oauth/token",
      comments: "The OAuth 2.0 Token URL for SurveyMonkey.",
    },
    
    
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the [SurveyMonkey App](https://developer.surveymonkey.com/apps/).",
      example: "xxxxxxxxxxxxxxxxxxxxxxxx",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the SurveyMonkey App.",
    },
  },
});

export const surveyMonkeyAccessToken = connection({
  key: "surveyMonkeyAccessToken",
  display: {
    label: "Access Token",
    description: "Authenticate using an access token",
  },
  inputs: {
    region: {
      label: "Region",
      placeholder: "Select region",
      type: "string",
      required: true,
      shown: true,
      default: "us",
      model: [
        { label: "United States", value: "us" },
        { label: "European Union", value: "eu" },
        { label: "Canada", value: "ca" },
      ],
      comments: "The SurveyMonkey region for the account.",
    },
    accessToken: {
      label: "Access Token",
      placeholder: "Enter Access Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The long-lived access token from the [SurveyMonkey Developer Portal](https://developer.surveymonkey.com/apps/). Found in the app's Settings tab.",
      example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    apiKey: {
      label: "API Key (Client ID)",
      placeholder: "Enter API Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The app's Client ID, needed for webhook signature verification.",
      example: "xxxxxxxxxxxxxxxxxxxxxxxx",
    },
    apiSecret: {
      label: "API Secret (Client Secret)",
      placeholder: "Enter API Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The app's Client Secret, needed for webhook signature verification.",
    },
  },
});

export default [surveyMonkeyOAuth, surveyMonkeyAccessToken];
