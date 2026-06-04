import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { oauth as adsConnection, dataManagerOAuth } from "./connections";
import {
  cleanCustomerId,
  validateApiVersion,
  validateDataManagerApiVersion,
} from "./util";

interface Values {
  accessToken: string;
  developerToken: string;
}

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

export const validateConnection = (connection: Connection): Values => {
  if (connection.key !== adsConnection.key) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type received: ${connection.key}`,
    );
  }

  const developerToken = util.types.toString(connection.fields?.developerToken);
  if (!developerToken) {
    throw new ConnectionError(connection, "Did not receive a Developer Token.");
  }

  const accessToken = extractAccessToken(connection);

  return { accessToken, developerToken };
};

export const createClient = (
  connection: Connection,
  debugEnabled: boolean,
  logger: ActionLogger,
  loginCustomerId?: string | undefined,
): HttpClient => {
  const { accessToken, developerToken } = validateConnection(connection);
  const parsedVersion = util.types.toString(connection.fields?.apiVersion);
  const apiVersion = validateApiVersion(parsedVersion, logger);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
  };

  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }

  return createHttpClient({
    baseUrl: `https://googleads.googleapis.com/${apiVersion}`,
    headers,
    debug: debugEnabled,
  });
};

export const validateDataManagerConnection = (
  connection: Connection,
): { accessToken: string } => {
  if (connection.key !== dataManagerOAuth.key) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type received: ${connection.key}. The Ingest Offline Conversions action requires the "${dataManagerOAuth.key}" connection.`,
    );
  }

  return { accessToken: extractAccessToken(connection) };
};

export const createDataManagerClient = (
  connection: Connection,
  debugEnabled: boolean,
  logger: ActionLogger,
): HttpClient => {
  const { accessToken } = validateDataManagerConnection(connection);
  const parsedVersion = util.types.toString(connection.fields?.apiVersion);
  const apiVersion = validateDataManagerApiVersion(parsedVersion, logger);

  return createHttpClient({
    baseUrl: `https://datamanager.googleapis.com/${apiVersion}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    debug: debugEnabled,
  });
};

export const createLocalServicesClient = (
  connection: Connection,
  debugEnabled: boolean,
  loginCustomerId?: string | undefined,
): HttpClient => {
  const { accessToken, developerToken } = validateConnection(connection);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
  };

  if (loginCustomerId) {
    headers["login-customer-id"] = cleanCustomerId(loginCustomerId);
  }

  return createHttpClient({
    baseUrl: "https://localservices.googleapis.com/v1",
    headers,
    debug: debugEnabled,
  });
};
