import { onPremConnection } from "@prismatic-io/spectral";
import { DEFAULT_GITLAB_URL } from "../constants";

export const accessToken = onPremConnection({
  key: "accessToken",
  display: {
    label: "Access Token",
    description:
      "Authenticate requests to GitLab using a personal, project, or group access token.",
  },
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
    accessToken: {
      label: "Access Token",
      placeholder: "Enter access token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "A personal, project, or group access token with the api scope, or read_api for read-only use. Tokens expire after at most 365 days by default. See [Personal access tokens](https://docs.gitlab.com/user/profile/personal_access_tokens/).",
      example: "glpat-xxxxxxxxxxxxxxxxxxxx",
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
