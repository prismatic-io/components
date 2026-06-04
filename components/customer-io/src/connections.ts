import { connection } from "@prismatic-io/spectral";

export const apiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description:
      "Authenticate requests to Customer.io using an API key & secret",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "API Key",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the API key from the developer console.",
      example: "example-a131bf1767a7",
    },
    siteId: {
      label: "Site Id",
      placeholder: "Site Id",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the Site Id obtained from the developer console.",
      example: "example-a131bf1767a7",
    },
  },
});

export default [apiKeyConnection];
