import { connection } from "@prismatic-io/spectral";
export const adobeCommerceOauth1 = connection({
  key: "adobeCommerceOauth1",
  display: {
    label: "OAuth 1.0a",
    description:
      "Authenticate with an Adobe Commerce store using an integration's OAuth 1.0a credentials.",
  },
  inputs: {
    storeUrl: {
      label: "Store URL",
      placeholder: "https://www.example.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL of the Adobe Commerce store, without a trailing slash and without the `/rest` path.",
      example: "https://www.example.com",
    },
    consumerKey: {
      label: "Consumer Key",
      placeholder: "Consumer Key",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The consumer key shown when an integration is activated under **System > Extensions > Integrations** in the Adobe Commerce Admin. See [Authentication](https://developer.adobe.com/commerce/webapi/get-started/authentication/).",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    consumerSecret: {
      label: "Consumer Secret",
      placeholder: "Consumer Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The consumer secret issued alongside the consumer key above. It is used to sign each request and is never sent to the store.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    accessToken: {
      label: "Access Token",
      placeholder: "Access Token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The access token issued when the integration was activated. Unlike a bearer token it is not sufficient on its own: it identifies the integration, and the access token secret below proves possession.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    accessTokenSecret: {
      label: "Access Token Secret",
      placeholder: "Access Token Secret",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The access token secret issued alongside the access token above. It is used to sign each request and is never sent to the store.",
      example: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    storeCode: {
      label: "Store Code",
      placeholder: "default",
      type: "string",
      required: false,
      shown: true,
      comments:
        "The store view code requests are scoped to, used as the `<store_code>` segment of `/rest/<store_code>/V1`. Leave as `default` unless the store serves multiple store views.",
      example: "default",
      default: "default",
    },
  },
});
