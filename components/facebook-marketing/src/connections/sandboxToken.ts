import { connection } from "@prismatic-io/spectral";
export const sandboxToken = connection({
  key: "sandboxToken",
  display: {
    label: "Sandbox Token",
    description: "Authenticate using a sandbox access token",
  },
  inputs: {
    token: {
      label: "Sandbox Token",
      type: "password",
      required: true,
      shown: true,
      comments: "A valid sandbox token for Meta Ads API",
    },
  },
});
