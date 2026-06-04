import { connection } from "@prismatic-io/spectral";






















































export const personalAccessToken = connection({
  key: "apiToken",
  display: {
    label: "ShipBob Personal Access Token",
    description: "Authenticate with ShipBob using a Personal Access Token",
  },
  inputs: {
    apiToken: {
      label: "Personal Access Token",
      placeholder: "Personal Access Token",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Log in to https://web.shipbob.com/app/merchant/#/Integrations/token-management to fetch a personal access token for development purposes",
    },
  },
});

export default [personalAccessToken];
