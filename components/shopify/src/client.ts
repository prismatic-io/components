import {
  type ActionLogger,
  type Connection,
  util,
} from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { GraphQLClient } from "graphql-request";
import { shopifyConnection as deprecatedOAuth2Connection } from "./connections/oauth2";
import {
  DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
  DEFAULT_SHOPIFY_VERSION,
} from "./constants";
import { gqlErrorsCheck } from "./util";

export const getShopifyHostname = (host: string): string => {
  const trimmed = host.trim();
  const hostnameRegex =
    /^(?:https?:\/\/)?([a-z\d][a-z\d-]*)(?:\.myshopify\.com)?(?::\d+)?(?:[/?#].*)?$/i;
  const result = hostnameRegex.exec(trimmed);
  if (!result) {
    throw new Error(
      `Unable to parse hostname "${trimmed}". It should look like "YOUR-SHOPIFY-DOMAIN" or "YOUR-SHOPIFY-DOMAIN.myshopify.com".`,
    );
  }
  return `${result[1].toLowerCase()}.myshopify.com`;
};

export const getLegacyShopifyHostname = (host: string): string => {
  const hostnameRegex = /(https:\/\/)?(.*\.myshopify.com)/;
  const result = hostnameRegex.exec(host);
  if (!result) {
    throw new Error(
      `Unable to parse hostname "${host}". It should look like "YOUR-SHOPIFY-DOMAIN.myshopify.com".`,
    );
  }
  return result[2];
};

export const getConnectionHostname = (connection: Connection): string => {
  const host = util.types.toString(connection.fields.host);
  return connection.key === deprecatedOAuth2Connection.key
    ? getLegacyShopifyHostname(host)
    : getShopifyHostname(host);
};

const getApiVersion = (
  shopifyConnection: Connection,
  defaultVersion: string,
  logger?: ActionLogger,
): string => {
  const connectionApiVersion = util.types.toString(
    shopifyConnection.fields.apiVersion,
  );
  if (connectionApiVersion) {
    if (logger && connectionApiVersion < defaultVersion) {
      logger.warn(
        `This connection uses Shopify API version ${connectionApiVersion}, which is older than the current default (${defaultVersion}). ` +
          `Shopify supports each stable API version for a minimum of 12 months, after which requests fall forward to the oldest supported stable version. ` +
          `Update the API Version field in your connection to ${defaultVersion} or later, or clear it to use the default, to access current features including the new collections model. ` +
          `See https://shopify.dev/docs/api/usage/versioning`,
      );
    }
    return connectionApiVersion;
  }
  return defaultVersion;
};

export const getShopifyClient = (
  shopifyConnection: Connection,
  apiVersion?: string,
  debug?: boolean,
  logger?: ActionLogger,
) => {
  const shopifyHostname = getConnectionHostname(shopifyConnection);
  const version =
    apiVersion ??
    getApiVersion(shopifyConnection, DEFAULT_SHOPIFY_VERSION, logger);

  return createClient({
    debug,
    baseUrl: `https://${shopifyHostname}/admin/api/${version}`,
    headers: {
      "X-Shopify-Access-Token": util.types.toString(
        shopifyConnection.token?.access_token ||
          shopifyConnection.fields.adminApiAccessToken,
      ),
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });
};

export const getShopifyGraphQlClient = (
  shopifyConnection: Connection,
  apiVersion: string | undefined,
  debug: boolean,
  logger: ActionLogger,
) => {
  const shopifyHostname = getConnectionHostname(shopifyConnection);
  const version =
    apiVersion ??
    getApiVersion(
      shopifyConnection,
      DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
      logger,
    );
  const url = `https://${shopifyHostname}/admin/api/${version}/graphql.json`;
  return new GraphQLClient(url, {
    headers: {
      "X-Shopify-Access-Token": util.types.toString(
        shopifyConnection.token?.access_token ||
          shopifyConnection.fields.adminApiAccessToken,
      ),
      "Content-type": "application/json",
    },
    requestMiddleware: (request) => {
      if (debug) logger.debug(JSON.stringify(request));
      return request;
    },
    responseMiddleware: (response) => {
      if (debug) {
        logger.debug(JSON.stringify(response));
      }
      gqlErrorsCheck(response);
      return response;
    },
  });
};
