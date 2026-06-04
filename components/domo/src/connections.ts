import { connection } from "@prismatic-io/spectral";

export const oauth = connection({
  key: "oauth",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate against the Domo API using OAuth 2.0 client credentials.",
  },
  inputs: {
    clientId: {
      label: "Client ID",
      placeholder: "Enter Client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Client Identifier of the Domo app for API authentication.",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      comments: "The Client Secret of the Domo app for API authentication.",
    },
    scopes: {
      label: "Scopes",
      placeholder: "Enter scopes",
      type: "string",
      required: true,
      comments: "The space-separated OAuth permission scopes for the API.",
      example: "data workflow audit buzz user account dashboard",
      default: "",
    },
  },
});

export default [oauth];
