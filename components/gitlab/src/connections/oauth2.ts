import { OAuth2Type, onPremConnection } from "@prismatic-io/spectral";
import { DEFAULT_GITLAB_URL } from "../constants";
export const oauth2 = onPremConnection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0",
    description:
      "Authenticate requests to GitLab using OAuth 2.0 authorization code flow.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    gitlabUrl: {
      label: "GitLab URL",
      placeholder: "Enter GitLab URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL of the GitLab instance: https://gitlab.com for GitLab.com, or the URL of a self-managed instance. For an instance on a private network, use its internal URL; its hostname is used to validate the TLS certificate. The URL must use https unless requests go through the on-prem agent.",
      example: "https://gitlab.com",
      default: DEFAULT_GITLAB_URL,
    },
    host: {
      label: "Host",
      placeholder: "Enter host",
      type: "string",
      required: false,
      shown: false,
      comments: "The on-prem agent tunnel host. Set by the on-prem agent.",
      example: "10.0.0.12",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port",
      type: "string",
      required: false,
      shown: false,
      comments: "The on-prem agent tunnel port. Set by the on-prem agent.",
      example: "443",
      onPremControlled: true,
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 authorization URL. For a self-managed instance, replace gitlab.com with the instance's host. See [OAuth 2.0 identity provider API](https://docs.gitlab.com/api/oauth2/).",
      example: "https://gitlab.com/oauth/authorize",
      default: "https://gitlab.com/oauth/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 token URL. For a self-managed instance, replace gitlab.com with the instance's host.",
      example: "https://gitlab.com/oauth/token",
      default: "https://gitlab.com/oauth/token",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Space-separated OAuth scopes. Use api for read and write access, or read_api for read-only access.",
      example: "api",
      default: "api",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application ID of the OAuth application registered in GitLab. See [Configure GitLab as an OAuth 2.0 authentication identity provider](https://docs.gitlab.com/integration/oauth_provider/).",
      example:
        "8f3b2a1c9d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Secret of the OAuth application registered in GitLab.",
      example: "gloas-xxxxxxxxxxxxxxxxxxxx",
    },
    caCertificate: {
      label: "CA Certificate",
      placeholder: "Enter PEM-encoded CA certificate",
      type: "text",
      required: false,
      shown: true,
      comments:
        "The PEM-encoded certificate of the authority that signed the instance's TLS certificate. Required when a self-managed instance uses an internal certificate authority.",
      example:
        "-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----",
    },
    ignoreSslErrors: {
      label: "Ignore SSL Errors",
      type: "boolean",
      required: false,
      shown: true,
      comments:
        "When true, TLS certificate validation is disabled. Supply a CA Certificate instead whenever possible.",
      default: "false",
    },
  },
});
