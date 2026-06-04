import { connection } from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Connect using an OpenAI or Azure OpenAI API key",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      shown: true,
      placeholder: "Enter API key",
      comments:
        "[OpenAI API key](https://platform.openai.com/account/api-keys) or Azure OpenAI API key.",
      example: "sk-abc123def456ghi789jkl012mno345pqr678stu901vwx",
    },
    organization: {
      label: "Organization / Azure Resource Name",
      type: "string",
      required: false,
      shown: true,
      placeholder: "org-abc123 or my-azure-resource",
      comments:
        "For Azure OpenAI: Enter your Azure resource name (the subdomain from your endpoint URL). For example, if your endpoint is https://my-resource.openai.azure.com/, enter 'my-resource'. For OpenAI: Enter your OpenAI organization ID (e.g. org-abc123). Only required if you belong to multiple organizations.",
      example: "my-azure-resource",
    },
    isOpenAIKey: {
      label: "Is OpenAI Key",
      type: "boolean",
      required: true,
      shown: true,
      comments:
        "When true, uses the OpenAI API directly. When false, uses Azure OpenAI Service.",
      default: "false",
    },
    apiVersion: {
      label: "API Version",
      type: "string",
      required: false,
      shown: true,
      placeholder: "2025-01-01-preview",
      comments:
        "The Azure OpenAI API version to use. Only applies when using Azure OpenAI Service (not direct OpenAI).",
      default: "2025-01-01-preview",
    },
  },
});

export default [apiKey];
