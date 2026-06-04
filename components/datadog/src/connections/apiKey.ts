import { connection } from "@prismatic-io/spectral";
import { DATADOG_SITES, DEFAULT_DATADOG_SITE } from "../constants";







export const apiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key + Application Key",
    description:
      "Authenticate using a Datadog API Key and Application Key. The API Key authenticates your organization, and the Application Key authorizes management operations.",
  },
  inputs: {
    datadogSite: {
      label: "Datadog Site",
      type: "string",
      required: true,
      shown: true,
      model: DATADOG_SITES,
      default: DEFAULT_DATADOG_SITE,
      comments:
        "Select the Datadog site that matches your organization. This determines the API base URL.",
    },
    apiKey: {
      label: "API Key",
      placeholder: "Enter Datadog API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Datadog API Key. Create one at Organization Settings > API Keys in Datadog.",
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    },
    applicationKey: {
      label: "Application Key",
      placeholder: "Enter Datadog Application Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Datadog Application Key. Required for management and read endpoints. Create one at Organization Settings > Application Keys in Datadog.",
      example: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    },
  },
});
