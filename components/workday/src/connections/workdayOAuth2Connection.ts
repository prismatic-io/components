import { OAuth2Type, oauth2Connection } from "@prismatic-io/spectral";

export const workdayOAuth2Connection = oauth2Connection({
  oauth2Type: OAuth2Type.AuthorizationCode,
  key: "workdayOAuth2Connection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Authorization URL for Workday. Replace <tenant_id> with the tenant ID.",
      default: "https://impl.workday.com/<tenant_id>/authorize",
    },
    tokenUrl: {
      label: "Token URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 Token URL for Workday. Replace <tenant_id> with the tenant ID.",
      default:
        "https://wd2-impl-services1.workday.com/ccx/oauth2/<tenant_id>/token",
    },
    scopes: {
      label: "Scopes",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Space-separated list of OAuth 2.0 scopes, if any are required.",
    },
    clientId: {
      label: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client ID issued by Workday for the registered API client.",
    },
    clientSecret: {
      label: "Client secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The OAuth 2.0 client secret paired with the Workday client ID.",
    },
    apiUrl: {
      label: "API URL",
      default: "https://<domain>/ccx",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL for the Workday API. Replace <domain> with the Workday domain.",
    },
  },
});
