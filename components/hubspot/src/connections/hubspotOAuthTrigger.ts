import { connection } from "@prismatic-io/spectral";
export const hubspotOAuthTrigger = connection({
  key: "hubspotOAuthTrigger",
  display: {
    label: "Webhook Authentication",
    description:
      "Authenticate HubSpot webhooks using Client Secret for signature verification only.",
  },
  inputs: {
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter Client Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Client Secret from the HubSpot app, used to verify webhook signatures.",
    },
  },
});
