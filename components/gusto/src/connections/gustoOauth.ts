import { oauth2Connection, OAuth2Type } from "@prismatic-io/spectral";
import {
  PRODUCTION_AUTHORIZE_URL,
  PRODUCTION_TOKEN_URL,
  SANDBOX_AUTHORIZE_URL,
  SANDBOX_TOKEN_URL,
} from "../constants";

export const gustoOauth = oauth2Connection({
  key: "gustoOauth",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      default: PRODUCTION_AUTHORIZE_URL,
      model: [
        {
          label: `Production (${PRODUCTION_AUTHORIZE_URL})`,
          value: PRODUCTION_AUTHORIZE_URL,
        },
        {
          label: `Developer Sandbox (${SANDBOX_AUTHORIZE_URL})`,
          value: SANDBOX_AUTHORIZE_URL,
        },
      ],
      comments:
        "Select Production for live accounts or Developer Sandbox for testing. See [Getting Started](https://docs.gusto.com/embedded-payroll/docs/getting-started) for details.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      default: PRODUCTION_TOKEN_URL,
      model: [
        {
          label: `Production (${PRODUCTION_TOKEN_URL})`,
          value: PRODUCTION_TOKEN_URL,
        },
        {
          label: `Developer Sandbox (${SANDBOX_TOKEN_URL})`,
          value: SANDBOX_TOKEN_URL,
        },
      ],
      comments:
        "Select the token URL matching the environment chosen for the Authorize URL.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Scopes",
      type: "string",
      required: false,
      shown: false,
      comments: "Scopes are not used for Gusto",
      default: "",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Client ID from the application created in the [Gusto Developer Portal](https://docs.gusto.com/embedded-payroll/docs/getting-started).",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the application created in the [Gusto Developer Portal](https://docs.gusto.com/embedded-payroll/docs/getting-started).",
    },
  },
});
