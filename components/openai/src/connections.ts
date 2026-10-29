import { connection, input } from "@prismatic-io/spectral";

export const openAiApiKey = connection({
  key: "openAiApiKey",
  display: {
    label: "API Key",
    description: "API Key connection for OpenAI",
  },
  inputs: {
    apiKey: input({
      label: "API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "Generate an API key at https://platform.openai.com/account/api-keys",
    }),
    organization: input({
      label: "Organization",
      type: "string",
      required: false,
      shown: true,
      comments:
        "Your organization ID. If you have just one organization, this value is optional.",
      example: "org-9AeeV8Yj8WK9tW6QEZNHDI8Z",
    }),
  },
});

export default [openAiApiKey];
