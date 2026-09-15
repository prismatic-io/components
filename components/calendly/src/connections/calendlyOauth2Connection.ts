import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";
import { LIVE_AUTH_URL } from "../constants";
export const calendlyOauth2Connection = oauth2Connection({
  key: "calendlyOauth2Connection",
  display: {
    description: "Authenticate using OAuth 2.0.",
    label: "OAuth 2.0",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Enter authorize URL",
      type: "string",
      default: `${LIVE_AUTH_URL}/oauth/authorize`,
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for the Calendly API. See [Calendly API docs](https://developer.calendly.com/api-docs) for details.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Enter token URL",
      type: "string",
      default: `${LIVE_AUTH_URL}/oauth/token`,
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for the Calendly API. See [Calendly API docs](https://developer.calendly.com/api-docs) for details.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter OAuth scopes",
      type: "string",
      required: false,
      shown: true,
      example:
        "activity_log:read availability:read data_compliance:write event_types:read organizations:read organizations:write routing_forms:read scheduled_events:read scheduled_events:write scheduling_links:write shares:write users:read webhooks:read webhooks:write",
      default:
        "activity_log:read availability:read data_compliance:write event_types:read organizations:read organizations:write routing_forms:read scheduled_events:read scheduled_events:write scheduling_links:write shares:write users:read webhooks:read webhooks:write",
      comments:
        "Space-separated list of OAuth permission scopes. The default includes all scopes required by this component's actions, triggers, and datasources. See [Calendly scopes](https://developer.calendly.com/docs/authentication/scopes) for available scopes.",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the Calendly OAuth application. See [Calendly API docs](https://developer.calendly.com/api-docs) for setup instructions.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the Calendly OAuth application. See [Calendly API docs](https://developer.calendly.com/api-docs) for setup instructions.",
    },
    useLiveServer: {
      label: "Use Live Server",
      type: "boolean",
      required: true,
      comments:
        "When true, uses the live server. When false, uses the mock server.",
    },
  },
});
