import { connection } from "@prismatic-io/spectral";

export const fluentCommerceOAuthPassword = connection({
  key: "fluent-password-grant",
  display: {
    description:
      "Authenticate requests to Fluent Commerce using a username and password",
    label: "Fluent Commerce OAuth 2.0 Password Grant",
  },
  inputs: {
    host: {
      label: "Fluent Host",
      placeholder: "https://REPLACE-ME.api.fluentretail.com",
      type: "string",
      required: true,
      shown: true,
      comments: "The retailer's Fluent API endpoint",
      example: "https://REPLACE-ME.api.fluentretail.com",
    },
    username: {
      label: "Retailer Username",
      placeholder: "Enter username",
      type: "string",
      required: true,
      shown: true,
      comments: "The retailer's username",
      example: "john_doe",
    },
    password: {
      label: "Retailer Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments: "The retailer's password",
    },
    clientId: {
      label: "OAuth 2.0 Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments: "A client ID obtained from Fluent support",
    },
    clientSecret: {
      label: "OAuth 2.0 Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "A client secret obtained from Fluent support",
    },
  },
});
