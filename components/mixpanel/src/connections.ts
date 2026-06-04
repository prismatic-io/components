import { connection } from "@prismatic-io/spectral";

export const apiToken = connection({
  key: "apiToken",
  display: {
    label: "API Key",
    description: "API Key for a Mixpanel Account",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Enter service account username",
      type: "string",
      required: false,
      comments:
        "The Mixpanel Service Account username. Obtain this from Settings > Organization Settings > Service Accounts in the Mixpanel dashboard.",
      example: "service-account-12345",
    },
    password: {
      label: "Password",
      placeholder: "Enter service account password",
      type: "password",
      required: false,
      comments:
        "The Mixpanel Service Account secret. Obtain this from Settings > Organization Settings > Service Accounts in the Mixpanel dashboard.",
      example: "a7183e1b7e9ab09b8a5cfa87d1934c3c",
    },
    projectToken: {
      label: "Project Token",
      placeholder: "Enter project token",
      type: "password",
      required: false,
      comments:
        "The Mixpanel Project Token. Find this in Settings > Project Settings in the Mixpanel dashboard.",
      example: "725a93138a7d12e00f16912848590ae7",
    },
  },
});

export default [apiToken];
