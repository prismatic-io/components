import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const sage200Oauth2Connection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "sage200Oauth2Connection",
  display: {
    label: "Sage 200 OAuth 2.0 Connection",
    description: "Connect to Sage 200 using OAuth 2.0",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Authorization URL for Sage 200",
      default: "https://id.sage.com/authorize?audience=s200ukipd/sage200",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Sage 200",
      default: "https://id.sage.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A space-delimited set of one or more scopes to get the user's permission to access.",
      default: "openid profile email offline_access",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "",
    },
    "ocp-apim-subscription-key": {
      label: "Ocp Apim Subscription Key",
      placeholder: "Ocp-Apim-Subscription-Key",
      type: "string",
      required: true,
      shown: true,
      comments:
        "You can get your subscription key following the steps at 'Obtain Developer Subscription Keys' here: https://developer.sage.com/200/api/get-started/",
    },
    sage200edition: {
      label: "Sage 200 Edition",
      placeholder: "Sage 200 Edition",
      type: "string",
      required: true,
      shown: true,
      model: [
        { label: "Standard", value: "standard" },
        { label: "Professional", value: "professional" },
      ],
      comments: "The Sage 200 Edition you are connecting to.",
    },
  },
});

export default [sage200Oauth2Connection];
