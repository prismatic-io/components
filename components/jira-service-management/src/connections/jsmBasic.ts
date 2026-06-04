import { getAtlassianBasicAuthConnection } from "atlassian-utils";

export const jsmBasic = getAtlassianBasicAuthConnection({
  key: "jsmBasic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using an email address and API token.",
  },
  comments: {
    username: "The Atlassian account email address used for authentication.",
    password:
      "The Atlassian API token. Generate one at [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens).",
    host: "The Atlassian site hostname (without https://).",
  },
});
