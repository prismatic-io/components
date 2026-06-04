import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import {
  buildAuthHeaders,
  createAtlassianClient,
  resolveAtlassianHost,
  validateAtlassianConnection,
} from "atlassian-utils";
import JiraApi from "jira-client";
import type { JiraApiCustomOptions } from "../types";
import { CONNECTION_KEYS, jiraBasicConnection } from "./index";

export const downloadFile = async (connection: Connection, url: string): Promise<Buffer> => {
  const { data } = await createHttpClient({
    baseUrl: url,
    responseType: "arraybuffer",
    headers: buildAuthHeaders(connection, CONNECTION_KEYS),
  }).get<Buffer>("");
  return data;
};

export const getHost = (connection: Connection): Promise<string> =>
  resolveAtlassianHost(connection, CONNECTION_KEYS);

export const getPayload = async (jiraConnection: Connection): Promise<JiraApiCustomOptions> => {
  validateAtlassianConnection(jiraConnection, CONNECTION_KEYS);

  if (jiraConnection.key === jiraBasicConnection.key) {
    const username = util.types.toString(jiraConnection.fields.username);
    const password = util.types.toString(jiraConnection.fields.password);
    return {
      username,
      password,
      host: util.types.toString(jiraConnection.fields.host).replace(/https?:\/\//g, ""),
      apiVersion: util.types.toString(jiraConnection.fields.version),
      auth: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    };
  }

  
  const bearer = util.types.toString(jiraConnection.token.access_token);
  return {
    bearer,
    host: await resolveAtlassianHost(jiraConnection, CONNECTION_KEYS),
    apiVersion: util.types.toString(jiraConnection.fields.version),
    auth: `Bearer ${bearer}`,
  };
};

const restApiPath = (connection: Connection): string =>
  `/rest/api/${util.types.toString(connection.fields.version)}`;

export const createClient = async (
  jiraConnection: Connection,
  debug = false,
): Promise<HttpClient> =>
  createAtlassianClient(jiraConnection, {
    keys: CONNECTION_KEYS,
    apiPath: "/rest/agile/1.0",
    debug,
  });




export const createV3Client = async (
  connection: Connection,
  debug = false,
  isBasicWebhookUrl = false,
): Promise<HttpClient> => {
  
  if (isBasicWebhookUrl && connection.key === jiraBasicConnection.key) {
    return createAtlassianClient(connection, {
      keys: CONNECTION_KEYS,
      apiPath: "/rest/webhooks/1.0",
      debug,
    });
  }
  return createAtlassianClient(connection, {
    keys: CONNECTION_KEYS,
    apiPath: restApiPath(connection),
    debug,
  });
};

export const createNodeClient = async (jiraConnection: Connection): Promise<JiraApi> => {
  const config = await getPayload(jiraConnection);
  return new JiraApi({
    ...config,
    protocol: "https",
    strictSSL: true,
  });
};
