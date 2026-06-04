import { connection } from "@prismatic-io/spectral";

export const stripeConnection = connection({
  key: "apiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests to Stripe using an API key.",
  },
  inputs: {
    apiKey: {
      label: "API Key",
      placeholder: "Enter API Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Stripe API Key from the Stripe Dashboard. Use a test key (sk_test_...) for development and a live key (sk_live_...) for production. Find the API key in the [Stripe API keys dashboard](https://dashboard.stripe.com/apikeys).",
      example: "sk_live_51JaOXaDtJQgcyrdS",
    },
  },
});

export default [stripeConnection];
