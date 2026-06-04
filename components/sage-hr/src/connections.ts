import { connection } from "@prismatic-io/spectral";

export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "API Key connection for Sage HR",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "a7183e1b7e9ab09b8a5cfa87d1934c3c",
      type: "password",
      required: true,
      comments: "API Key for your Sage HR User",
    },
    subdomain: {
      label: "Subdomain Name",
      placeholder: "acme",
      type: "string",
      required: true,
      comments: "The subdomain name of your Sage HR account",
    },
  },
});

export default [apiKey];
