import { connection } from "@prismatic-io/spectral";
export const conversionsToken = connection({
  key: "facebookMarketingConversionsToken",
  display: {
    label: "Access Token",
    description: "Authenticate using an access token",
  },
  inputs: {
    token: {
      label: "Access Token",
      type: "password",
      required: true,
      shown: true,
      comments: "A valid access token for Meta Ads API",
    },
  },
});
