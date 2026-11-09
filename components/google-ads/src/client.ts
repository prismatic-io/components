import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/http";
import {
  oauth as adsConnection,
  dataManagerOAuth,
  serviceAccount,
} from "./connections";
import {
  GOOGLE_ADS_ACCOUNT_TYPE,
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
} from "./types";
import {
  validateApiVersion,
  validateDataManagerApiVersion,
} from "./util/apiVersion";
import { cleanCustomerId } from "./util/clean";
import { googleAdsRetryConfig } from "./util/errors";
import { getServiceAccountToken } from "./util/serviceAccount";

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

export const validateConnection = (connection: Connection): void => {
  if (
    connection.key !== adsConnection.key &&
    connection.key !== serviceAccount.key
  ) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type received: ${connection.key}`,
    );
  }
};

export const getAccessToken = async (
  connection: Connection,
): Promise<string> => {
  validateConnection(connection);
  return connection.key === serviceAccount.key
    ? getServiceAccountToken(connection)
    : extractAccessToken(connection);
};

const getAuthorizedClient = (
  client: HttpClient,
  connection: Connection,
): HttpClient => {
  if (connection.key === serviceAccount.key) {
    client.interceptors.request.use(async (config) => {
      config.headers.set(
        "Authorization",
        `Bearer ${await getServiceAccountToken(connection)}`,
      );
      return config;
    });
  }
  return client;
};

const authorizationHeader = (connection: Connection): Record<string, string> =>
  connection.key === serviceAccount.key
    ? {}
    : { Authorization: `Bearer ${extractAccessToken(connection)}` };

export const createClient = ({
  connection,
  debugEnabled,
  logger,
  loginCustomerId,
  linkedCustomerId,
}: CreateClientProps): HttpClient => {
  validateConnection(connection);
  const parsedVersion = util.types.toString(connection.fields?.apiVersion);
  const apiVersion = validateApiVersion(parsedVersion, logger);

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...authorizationHeader(connection),
  };

  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }

  if (linkedCustomerId !== undefined) {
    headers["linked-customer-id"] = cleanCustomerId(linkedCustomerId);
  }

  return getAuthorizedClient(
    createHttpClient({
      baseUrl: `${GOOGLE_ADS_BASE_URL}/${apiVersion}`,
      headers,
      responseType: "json",
      debug: debugEnabled,
      retryConfig: googleAdsRetryConfig,
    }),
    connection,
  );
};

export const validateDataManagerConnection = (
  connection: Connection,
): { accessToken: string } => {
  if (connection.key === serviceAccount.key) {
    throw new ConnectionError(
      connection,
      `Unsupported connection type for the Data Manager API: ${connection.key}. Use the Data Manager OAuth 2.0 connection; the Service Account connection only works with the Google Ads and Local Services APIs.`,
    );
  }
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
  loginCustomerId,
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
      ...(loginCustomerId !== undefined &&
        loginCustomerId !== "" && {
          "login-account": `accountTypes/${GOOGLE_ADS_ACCOUNT_TYPE}/accounts/${loginCustomerId}`,
        }),
    },
    responseType: "json",
    debug: debugEnabled,
    retryConfig: googleAdsRetryConfig,
  });
};

export const createLocalServicesClient = ({
  connection,
  debugEnabled,
  loginCustomerId,
}: CreateLocalServicesClientProps): HttpClient => {
  validateConnection(connection);

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...authorizationHeader(connection),
  };

  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }

  return getAuthorizedClient(
    createHttpClient({
      baseUrl: `${GOOGLE_LOCAL_SERVICES_BASE_URL}/${GOOGLE_LOCAL_SERVICES_API_VERSION}`,
      headers,
      responseType: "json",
      debug: debugEnabled,
      retryConfig: googleAdsRetryConfig,
    }),
    connection,
  );
};
