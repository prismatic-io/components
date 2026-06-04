import { connection } from "@prismatic-io/spectral";

export const basic = connection({
  key: "Basic",
  display: {
    description:
      "Authenticate requests to Woo Commerce with values obtained from your wordpress site.",
    label: "WooCommerce Basic Auth",
  },
  inputs: {
    username: {
      label: "Consumer Key",
      placeholder: "Consumer Key",
      type: "string",
      required: true,
      shown: true,
    },
    password: {
      label: "Consumer Secret",
      placeholder: "Consumer Secret",
      type: "password",
      required: true,
      shown: true,
    },
    domain: {
      label: "Domain",
      placeholder: "Domain",
      type: "string",
      example: "www.mySite.com",
      comments: "Provide a string value for the domain of your wordpress site.",
      required: true,
      shown: true,
    },
  },
});

export default [basic];
