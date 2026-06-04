import { connection } from "@prismatic-io/spectral";
import type { BasicAuthConnectionParams } from "../interfaces/ConnectionParams";

export const getAtlassianBasicAuthConnection = ({
  key,
  display,
  comments,
  additionalInputs,
}: BasicAuthConnectionParams) =>
  connection({
    key,
    display: {
      label: display?.label || "Basic Authentication",
      description:
        display?.description ||
        "Authenticate with Atlassian using username and API token.",
    },
    inputs: {
      username: {
        label: "Username",
        placeholder: "Enter username",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.username ||
          "Your Atlassian username or email address used for authentication.",
        example: "john.doe@example.com",
      },
      password: {
        label: "API Key",
        placeholder: "Enter API key",
        type: "password",
        required: true,
        shown: true,
        comments:
          comments?.password ||
          "Your Atlassian API token. Cloud users must generate an API token from [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens).",
        example: "ATATT3xFfGF0T8gK8Example1234567890abcdefGHIJKLMNOP",
      },
      host: {
        label: "Host",
        placeholder: "Enter host URL",
        type: "string",
        required: true,
        shown: true,
        comments:
          comments?.host ||
          "The hostname of your Atlassian instance (without https://).",
        example: "your-company.atlassian.net",
      },
      ...(additionalInputs || {}),
    },
  });
