import { type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { GraphQLClient } from "graphql-request";
import { DEFAULT_SHOPIFY_GRAPHQL_API_VERSION, DEFAULT_SHOPIFY_VERSION } from "./constants";
import { gqlErrorsCheck } from "./util";

export const getShopifyHostname = (host: string): string => {
  const hostnameRegex = /(https:\/\/)?(.*\.myshopify.com)/;
  const result = hostnameRegex.exec(host);
  if (!result) {
    throw new Error(
      `Unable to parse hostname "${host}". It should look like "YOUR-SHOPIFY-DOMAIN.myshopify.com".`,
    );
  }
  return result[2];
};




const getApiVersion = (shopifyConnection: Connection, defaultVersion: string): string => {
  const connectionApiVersion = shopifyConnection.fields.apiVersion;
  if (connectionApiVersion && typeof connectionApiVersion === "string") {
    return connectionApiVersion;
  }
  return defaultVersion;
};

export const getShopifyClient = (
  shopifyConnection: Connection,
  apiVersion?: string, 
  debug?: boolean,
) => {
  const shopifyHostname = getShopifyHostname(util.types.toString(shopifyConnection.fields.host));
  const version = apiVersion ?? getApiVersion(shopifyConnection, DEFAULT_SHOPIFY_VERSION);

  return createClient({
    debug,
    baseUrl: `https://${shopifyHostname}/admin/api/${version}`,
    headers: {
      "X-Shopify-Access-Token": util.types.toString(
        shopifyConnection.token?.access_token || shopifyConnection.fields.adminApiAccessToken,
      ),
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
};

export const getShopifyGraphQlClient = (
  shopifyConnection: Connection,
  apiVersion?: string, 
  debug?: boolean,
) => {
  const shopifyHostname = getShopifyHostname(util.types.toString(shopifyConnection.fields.host));
  const version =
    apiVersion ?? getApiVersion(shopifyConnection, DEFAULT_SHOPIFY_GRAPHQL_API_VERSION);
  const url = `https://${shopifyHostname}/admin/api/${version}/graphql.json`;
  return new GraphQLClient(url, {
    headers: {
      "X-Shopify-Access-Token": util.types.toString(
        shopifyConnection.token?.access_token || shopifyConnection.fields.adminApiAccessToken,
      ),
      "Content-type": "application/json",
    },
    requestMiddleware: (request) => {
      if (debug) console.log(JSON.stringify(request));
      return request;
    },
    responseMiddleware: (response) => {
      if (debug) {
        console.log(JSON.stringify(response));
      }
      gqlErrorsCheck(response);
      return response;
    },
  });
};
