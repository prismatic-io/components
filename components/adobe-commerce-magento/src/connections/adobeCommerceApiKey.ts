import { connection, util } from "@prismatic-io/spectral";
export const adobeCommerceApiKey = connection({
  key: "adobeCommerceApiKey",
  display: {
    label: "API Access Key (Deprecated)",
    description:
      "Authenticate with Adobe Commerce using an API Access Key and Secret.",
  },
  inputs: {
    applicationId: {
      label: "Application ID",
      placeholder: "Application ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The application ID half of a Marketplace API access key. Generate one in the Marketplace Developer Portal under your account name > **Account Information** > **Manage API Keys**. See [API access keys](https://developer.adobe.com/commerce/marketplace/guides/eqp/v1/access-keys#what-is-an-api-access-key).",
      example: "XXXXXXXXXX",
    },
    applicationSecret: {
      label: "Application Secret",
      placeholder: "Application Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The application secret issued alongside the application ID above, from the same Marketplace API access key. The key can be regenerated or deleted at any time under **Manage API Keys**. See [API access keys](https://developer.adobe.com/commerce/marketplace/guides/eqp/v1/access-keys#what-is-an-api-access-key).",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
