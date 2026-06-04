import { connection, util } from "@prismatic-io/spectral";

export const adobeCommerceApiKey = connection({
  key: "adobeCommerceApiKey",
  display: {
    label: "API Access Key",
    description: "Authenticate with Adobe Commerce using an API Access Key and Secret.",
  },
  inputs: {
    applicationId: {
      label: "Application ID",
      placeholder: "Application ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "https://developer.adobe.com/commerce/marketplace/guides/eqp/v1/access-keys#what-is-an-api-access-key",
      example: "AQ17NZ49WC",
    },
    applicationSecret: {
      label: "Application Secret",
      placeholder: "Application Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "https://developer.adobe.com/commerce/marketplace/guides/eqp/v1/access-keys#what-is-an-api-access-key",
      example: "8820c99614d65f923df7660276f20e029d73e2ca",
    },
    productionEnvironment: {
      label: "Use Production Environment",
      type: "boolean",
      required: true,
      shown: true,
      comments:
        "Set true for production environment (https://commercedeveloper-api.adobe.com), false for sandbox (https://commercedeveloper-sandbox-api.adobe.com).",
      default: "false",
      clean: util.types.toBool,
    },
  },
});

export default [adobeCommerceApiKey];
