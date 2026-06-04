import { connection } from "@prismatic-io/spectral";

export const karbonApiKey = connection({
  key: "karbonApiKey",
  display: {
    label: "API Key",
    description: "API Key connection for Karbon",
  },
  inputs: {
    applicationId: {
      type: "string",
      label: "Application ID",
      comments:
        "The application ID for the Karbon API. You receive this when you create an application in Karbon.",
      example: "00000000-0000-0000-0000-000000000000",
      required: true,
    },
    accessKey: {
      type: "password",
      label: "Access Key",
      comments:
        "Get this by clicking Settings > Connected Apps > Manage on your app.",
      example: "eyJ.....",
      required: true,
    },
  },
});

export default [karbonApiKey];
