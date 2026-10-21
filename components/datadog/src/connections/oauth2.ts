import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { DATADOG_SITES, DEFAULT_DATADOG_SITE } from "../constants";
export const oauth2AuthorizationCode = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0 Authorization Code",
    description:
      "Authenticate using OAuth 2.0 Authorization Code flow. Primarily used for Datadog integration partners and marketplace apps.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    datadogSite: {
      label: "Datadog Site",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Select the Datadog site that matches the organization. This determines the API base URL.",
      default: DEFAULT_DATADOG_SITE,
      model: DATADOG_SITES,
    },
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter Authorize URL",
      type: "string",
      required: false,
      shown: false,
      comments: "The Datadog OAuth 2.0 authorization endpoint.",
      default: "https://app.datadoghq.com/oauth2/v1/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter Token URL",
      type: "string",
      required: false,
      shown: false,
      comments: "The Datadog OAuth 2.0 token endpoint.",
      default: "https://api.datadoghq.com/oauth2/v1/token",
    },
    revokeUrl: {
      label: "Revoke URL",
      placeholder: "Enter Revoke URL",
      type: "string",
      required: false,
      shown: false,
      comments: "The Datadog OAuth 2.0 token revocation endpoint.",
      default: "https://api.datadoghq.com/oauth2/v1/revoke",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: false,
      shown: false,
      comments:
        "Space-separated OAuth 2.0 scopes. Available scopes include: metrics_read, timeseries_query, metric_tags_manage, create_webhooks.",
      default:
        "metrics_read timeseries_query metric_tags_manage create_webhooks",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client ID from the Datadog OAuth application.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the Datadog OAuth application.",
    },
  },
});
