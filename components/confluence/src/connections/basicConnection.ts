import { connection } from "@prismatic-io/spectral";
export const basicConnection = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Basic Authentication connection for Confluence",
  },
  inputs: {
    email: {
      label: "Email",
      placeholder: "Enter email address",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Your Confluence account email address used for authentication.",
      example: "john.doe@example.com",
    },
    apiToken: {
      label: "API Token",
      placeholder: "API Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Your Confluence API token for authentication. Generate this from your [Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens).",
      example: "ATATT3xFfGF0X1234567890abcdefghij",
    },
    host: {
      label: "Host",
      placeholder: "Enter Confluence host",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Your Confluence site URL. Only enter your domain without the protocol.",
      example: "your-domain.atlassian.net",
    },
  },
});
