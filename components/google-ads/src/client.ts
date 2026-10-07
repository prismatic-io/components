import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { oauth as adsConnection, dataManagerOAuth } from "./connections";
import {
  GOOGLE_ADS_BASE_URL,
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_BASE_URL,
  GOOGLE_LOCAL_SERVICES_API_VERSION,
  GOOGLE_LOCAL_SERVICES_BASE_URL,
} from "./constants";
import type {
  CreateClientProps,
  CreateDataManagerClientProps,
  CreateLocalServicesClientProps,
  GoogleAdsConnectionValues,
} from "./types";
import {
  validateApiVersion,
  validateDataManagerApiVersion,
} from "./util/apiVersion";
import { cleanCustomerId } from "./util/clean";
const extractAccessToken = (connection: Connection): string => {
  const accessToken = util.types.toString(connection.token?.access_token);
  if (!accessToken) {
    throw new ConnectionError(
      connection,
      "Did not receive an access token. Confirm your connection settings.",
    );
  }
  return accessToken;
};
export const validateConnection = (
  connection: Connection,
): GoogleAdsConnectionValues => {
  if (connection.key !== adsConnection.key) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type received: ${connection.key}`,
    );
  }
  const accessToken = extractAccessToken(connection);
  return { accessToken };
};
export const createClient = ({
  connection,
  debugEnabled,
  logger,
  loginCustomerId,
}: CreateClientProps): HttpClient => {
  const { accessToken } = validateConnection(connection);
  const parsedVersion = util.types.toString(connection.fields?.apiVersion);
  const apiVersion = validateApiVersion(parsedVersion, logger);
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }
  return createHttpClient({
    baseUrl: `${GOOGLE_ADS_BASE_URL}/${apiVersion}`,
    headers,
    responseType: "json",
    debug: debugEnabled,
  });
};
export const validateDataManagerConnection = (
  connection: Connection,
): {
  accessToken: string;
} => {
  if (
    connection.key !== dataManagerOAuth.key &&
    connection.key !== adsConnection.key
  ) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type received: ${connection.key}.`,
    );
  }
  return { accessToken: extractAccessToken(connection) };
};
export const createDataManagerClient = ({
  connection,
  debugEnabled,
  logger,
}: CreateDataManagerClientProps): HttpClient => {
  const { accessToken } = validateDataManagerConnection(connection);
  const apiVersion =
    connection.key === adsConnection.key
      ? GOOGLE_DATA_MANAGER_API_VERSION
      : validateDataManagerApiVersion(
          util.types.toString(connection.fields?.apiVersion),
          logger,
        );
  return createHttpClient({
    baseUrl: `${GOOGLE_DATA_MANAGER_BASE_URL}/${apiVersion}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    responseType: "json",
    debug: debugEnabled,
  });
};
export const createLocalServicesClient = ({
  connection,
  debugEnabled,
  loginCustomerId,
}: CreateLocalServicesClientProps): HttpClient => {
  const { accessToken } = validateConnection(connection);
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }
  return createHttpClient({
    baseUrl: `${GOOGLE_LOCAL_SERVICES_BASE_URL}/${GOOGLE_LOCAL_SERVICES_API_VERSION}`,
    headers,
    responseType: "json",
    debug: debugEnabled,
  });
};
