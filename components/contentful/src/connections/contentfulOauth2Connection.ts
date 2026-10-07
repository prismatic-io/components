import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
export const contentfulOauth2Connection = oauth2Connection({
  key: "contentfulOauth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: true,
      shown: false,
      comments:
        "The OAuth 2.0 Authorization URL for Contentful authentication.",
      default: "https://be.contentful.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Contentful token exchange.",
      default: "https://be.contentful.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "content_management_manage",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A single OAuth 2.0 scope. Contentful accepts one scope per authorization. The manage scope includes read access.",
      default: "content_management_manage",
      model: [
        {
          label: "Content Management Manage",
          value: "content_management_manage",
        },
        { label: "Content Management Read", value: "content_management_read" },
      ],
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID of your Contentful OAuth 2.0 application, shown under your account profile's Developers > Applications page. See [Creating an OAuth 2.0 application](https://www.contentful.com/developers/docs/extensibility/oauth/).",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret of your Contentful OAuth 2.0 application, shown under your account profile's Developers > Applications page. See [Creating an OAuth 2.0 application](https://www.contentful.com/developers/docs/extensibility/oauth/).",
    },
  },
});
