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
      default: "https://be.contentful.com/oauth/authorize",
      required: true,
      shown: false,
      comments:
        "The OAuth 2.0 Authorization URL for Contentful authentication.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      default: "https://be.contentful.com/oauth/token",
      required: true,
      shown: false,
      comments: "The OAuth 2.0 Token URL for Contentful token exchange.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "content_management_manage",
      type: "string",
      required: true,
      shown: true,
      comments:
        "A single OAuth 2.0 scope. Contentful accepts one scope per authorization. Valid values: content_management_manage, content_management_read. The manage scope includes read access.",
      default: "content_management_manage",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the OAuth application credentials.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the OAuth application credentials.",
    },
  },
});

export default [contentfulOauth2Connection];
