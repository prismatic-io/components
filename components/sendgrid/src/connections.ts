import { connection } from "@prismatic-io/spectral";

export const sendGridConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "API Key connection for SendGrid",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API Key",
      type: "password",
      comments:
        "API Key from your SendGrid account. Generate one in Settings > API Keys. [Learn more](https://docs.sendgrid.com/ui/account-and-settings/api-keys)",
      example: "SG.1a2b3c4d5e6f7g8h.9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
      required: true,
      shown: true,
    },
  },
});

export default [sendGridConnection];
