import { connection } from "@prismatic-io/spectral";

export const apiToken = connection({
  key: "apiToken",
  display: {
    label: "API Key (Harvest v1/v2)",
    description:
      "Authenticate requests to Greenhouse using an API key. Deprecated: this authentication method sunsets on August 31, 2026. Use the OAuth 2.0 Client Credentials (Harvest V3) connection instead.",
  },
  inputs: {
    username: {
      label: "API Key",
      placeholder: "Enter API key",
      type: "password",
      required: true,
      comments:
        "The API key for the Greenhouse user. API keys can be generated in Greenhouse by navigating to Configure > Dev Center > API Credential Management.",
      example: "a7183e1b7e9ab09b8a5cfa87d1934c3c",
    },
  },
});
