import https from "node:https";
import { isIP } from "node:net";
import tls from "node:tls";
import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { AxiosError } from "axios";
import { accessToken, oauth2 } from "./connections";
import { API_PATH, MAX_RETRIES } from "./constants";
import type { GitlabRequestTarget } from "./types";
import {
  describeTransportError,
  isRetryableError,
  logRequest,
  logResponse,
  normalizeGitlabUrl,
  retryDelay,
} from "./utils";

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  if (connection.key === accessToken.key) {
    const token = util.types.toString(connection.fields.accessToken).trim();
    if (!token) {
      throw new ConnectionError(connection, "Access Token is required.");
    }
    return { "PRIVATE-TOKEN": token };
  }
  if (connection.key === oauth2.key) {
    const token = util.types.toString(connection.token?.access_token);
    if (!token) {
      throw new ConnectionError(
        connection,
        "The OAuth 2.0 connection has no access token. Reauthorize the connection.",
      );
    }
    return { Authorization: `Bearer ${token}` };
  }
  throw new ConnectionError(
    connection,
    `Unsupported connection type: ${connection.key}.`,
  );
};

const buildTlsAgent = (
  connection: Connection,
  hostname: string,
): https.Agent => {
  const ca = util.types.toString(connection.fields.caCertificate).trim();
  return new https.Agent({
    ca: ca || undefined,
    rejectUnauthorized: !util.types.toBool(connection.fields.ignoreSslErrors),
    servername: isIP(hostname) ? undefined : hostname,
    checkServerIdentity: (_dialed, cert) =>
      tls.checkServerIdentity(hostname, cert),
  });
};

export const resolveRequestTarget = (
  connection: Connection,
): GitlabRequestTarget => {
  const root = normalizeGitlabUrl(
    util.types.toString(connection.fields.gitlabUrl),
  );
  const url = new URL(root);
  const basePath = root.slice(url.origin.length);
  const headers = getAuthHeaders(connection);
  const host = util.types.toString(connection.fields.host).trim();
  const viaTunnel = host !== "";
  if (url.protocol === "http:" && !viaTunnel) {
    throw new ConnectionError(
      connection,
      "GitLab URL must use https unless the connection uses the on-prem agent.",
    );
  }
  const customTls =
    util.types.toString(connection.fields.caCertificate).trim() !== "" ||
    util.types.toBool(connection.fields.ignoreSslErrors);
  const httpsAgent =
    url.protocol === "https:" && (viaTunnel || customTls)
      ? buildTlsAgent(connection, url.hostname)
      : undefined;
  if (!viaTunnel) {
    return { baseUrl: `${root}${API_PATH}`, headers, httpsAgent, viaTunnel };
  }
  const port =
    util.types.toString(connection.fields.port).trim() ||
    (url.protocol === "https:" ? "443" : "80");
  return {
    baseUrl: `${url.protocol}//${host}:${port}${basePath}${API_PATH}`,
    headers: { ...headers, Host: url.host },
    httpsAgent,
    viaTunnel: true,
  };
};

export const createGitlabClient = (
  connection: Connection,
  logger: ActionLogger | false = false,
): HttpClient => {
  const { baseUrl, headers, httpsAgent, viaTunnel } =
    resolveRequestTarget(connection);
  const client = createClient({
    baseUrl,
    headers,
    responseType: "json",
    debug: false,
    retryConfig: {
      retries: MAX_RETRIES,
      retryCondition: isRetryableError,
      retryDelay,
    },
  });
  client.defaults.sensitiveHeaders = ["PRIVATE-TOKEN"];
  if (httpsAgent) {
    client.defaults.httpsAgent = httpsAgent;
  }
  if (logger) {
    client.interceptors.request.use(logRequest(logger));
    client.interceptors.response.use(logResponse(logger));
  }
  client.interceptors.response.use(undefined, (error: AxiosError) => {
    const described = describeTransportError(error, viaTunnel);
    if (described.response?.status === 401) {
      return Promise.reject(new ConnectionError(connection, described.message));
    }
    return Promise.reject(described);
  });
  return client;
};
