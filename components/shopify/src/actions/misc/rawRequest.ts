import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getShopifyHostname } from "../../client";
import { apiVersion, connectionInput, returnHeaders } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request (Deprecated)",
    description:
      "Send raw HTTP request to Shopify. This version of the action uses REST and is being deprecated. Please replace action with the Raw Request utilizing GraphQL.",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/users/current.json), The base URL is already included (https://YOUR-DOMAIN.myshopify.com/admin/api/API-VERSION). For example, to connect to https://YOUR-DOMAIN.myshopify.com/admin/api/API-VERSION/users/current.json, only /users/current.json is entered in this field.",
      example: "/users/current.json",
    },
    apiVersion,
    returnHeaders,
  },
  perform: async (_context, { connection, apiVersion, returnHeaders, ...httpClientInputs }) => {
    const shopifyHostname = getShopifyHostname(util.types.toString(connection.fields.host));
    const { data, headers } = await sendRawRequest(
      `https://${shopifyHostname}/admin/api/${apiVersion}`,
      httpClientInputs,
      {
        "Content-type": "application/json",
        "X-Shopify-Access-Token": util.types.toString(
          connection.token?.access_token || connection.fields.adminApiAccessToken,
        ),
      },
    );

    if (returnHeaders) {
      return { data: { data, headers } };
    }

    return { data };
  },
});
