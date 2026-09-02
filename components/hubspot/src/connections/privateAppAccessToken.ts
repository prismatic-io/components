import { connection } from "@prismatic-io/spectral";
export const privateAppAccessToken = connection({
  key: "privateAppAccessToken",
  display: {
    label: "Private App Access Token or Service Key",
    description:
      "Authenticate requests to HubSpot using a private app access token or an account service key.",
  },
  inputs: {
    accessToken: {
      label: "Access Token or Service Key",
      placeholder: "Enter Access Token or Service Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "A private app access token or an account service key. Service keys are HubSpot's recommended credential for new system-to-system integrations. Neither credential can configure webhook subscriptions over the API, so the Event Type Subscription trigger requires the OAuth 2.0 connection instead.",
    },
  },
});
